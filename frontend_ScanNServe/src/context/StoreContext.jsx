import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://scan-n-serve-backend.vercel.app";
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { getToken, isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        
        if (isSignedIn) {
            try {
                const token = await getToken();
                await axios.post(url + "/api/cart/add", { itemId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        
        if (isSignedIn) {
            try {
                const token = await getToken();
                await axios.post(url + "/api/cart/remove", { itemId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Fetch food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load cart data from backend
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart:", error);
            setCartItems({});
        }
    };

    // Load data on mount and when auth state changes
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            
            // Always fetch food list
            await fetchFoodList();
            
            // Wait for Clerk to load
            if (!isLoaded) {
                setLoading(false);
                return;
            }
            
            // Load cart if user is signed in
            if (isSignedIn) {
                try {
                    const token = await getToken();
                    await loadCartData(token);
                } catch (error) {
                    console.error("Error loading user cart:", error);
                    setCartItems({});
                }
            } else {
                // Load cart from localStorage for non-signed in users
                const localCart = localStorage.getItem('guestCart');
                if (localCart) {
                    try {
                        setCartItems(JSON.parse(localCart));
                    } catch (error) {
                        console.error("Error parsing local cart:", error);
                        setCartItems({});
                    }
                } else {
                    setCartItems({});
                }
            }
            
            setLoading(false);
        }
        
        loadData();
    }, [isSignedIn, isLoaded]);

    // Save guest cart to localStorage when not signed in
    useEffect(() => {
        if (!isSignedIn && !loading) {
            localStorage.setItem('guestCart', JSON.stringify(cartItems));
        }
    }, [cartItems, isSignedIn, loading]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        isSignedIn,
        user,
        loading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;