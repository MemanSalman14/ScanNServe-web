import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://scan-n-serve-backend.vercel.app";
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { getToken, isSignedIn } = useAuth();
    const { user, isLoaded } = useUser();

    // Get authorization header with token
    const getAuthHeaders = async () => {
        if (!isSignedIn) return {};
        
        try {
            const token = await getToken();
            return {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
        } catch (error) {
            console.error("Error getting token:", error);
            return {};
        }
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        
        if (isSignedIn) {
            try {
                const authHeaders = await getAuthHeaders();
                await axios.post(
                    `${url}/api/cart/add`, 
                    { itemId }, 
                    authHeaders
                );
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        
        if (isSignedIn) {
            try {
                const authHeaders = await getAuthHeaders();
                await axios.post(
                    `${url}/api/cart/remove`, 
                    { itemId }, 
                    authHeaders
                );
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

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

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async () => {
        if (isSignedIn) {
            try {
                const authHeaders = await getAuthHeaders();
                const response = await axios.post(
                    `${url}/api/cart/get`, 
                    {}, 
                    authHeaders
                );
                setCartItems(response.data.cartData || {});
            } catch (error) {
                console.error("Error loading cart:", error);
                setCartItems({});
            }
        }
    };

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            await fetchFoodList();
            
            if (isLoaded && isSignedIn) {
                await loadCartData();
            }
            setLoading(false);
        }
        loadData();
    }, [isSignedIn, isLoaded]);

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
        loading,
        getAuthHeaders
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;