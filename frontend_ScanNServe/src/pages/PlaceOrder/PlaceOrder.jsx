import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

    const { getTotalCartAmount, food_list, cartItems, url, getAuthHeaders } = useContext(StoreContext);
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        
        if (!isSignedIn) {
            toast.error("Please sign in to place order");
            return;
        }

        setLoading(true);

        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        if (orderItems.length === 0) {
            toast.error("Your cart is empty");
            setLoading(false);
            return;
        }

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };
        
        try {
            const authHeaders = await getAuthHeaders();
            let response = await axios.post(
                `${url}/api/order/place`, 
                orderData, 
                authHeaders
            );
            
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                toast.error(response.data.message || "Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/cart');
            toast.info("Please sign in to place an order");
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [isSignedIn]);

    useEffect(() => {
        if (user) {
            setData(prev => ({
                ...prev,
                email: user.primaryEmailAddress?.emailAddress || "",
                firstName: user.firstName || "",
                lastName: user.lastName || ""
            }));
        }
    }, [user]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input 
                        required 
                        name='firstName' 
                        onChange={onChangeHandler} 
                        value={data.firstName} 
                        type="text" 
                        placeholder='First name' 
                    />
                    <input 
                        required 
                        name='lastName' 
                        onChange={onChangeHandler} 
                        value={data.lastName} 
                        type="text" 
                        placeholder='Last name' 
                    />
                </div>
                <input 
                    required 
                    name='email' 
                    onChange={onChangeHandler} 
                    value={data.email} 
                    type="email" 
                    placeholder='Email address' 
                />
                <input 
                    required 
                    name='street' 
                    onChange={onChangeHandler} 
                    value={data.street} 
                    type="text" 
                    placeholder='Street' 
                />
                <div className="multi-fields">
                    <input 
                        required 
                        name='city' 
                        onChange={onChangeHandler} 
                        value={data.city} 
                        type="text" 
                        placeholder='City' 
                    />
                    <input 
                        required 
                        name='state' 
                        onChange={onChangeHandler} 
                        value={data.state} 
                        type="text" 
                        placeholder='State' 
                    />
                </div>
                <div className="multi-fields">
                    <input 
                        required 
                        name='zipcode' 
                        onChange={onChangeHandler} 
                        value={data.zipcode} 
                        type="text" 
                        placeholder='Zip code' 
                    />
                    <input 
                        required 
                        name='country' 
                        onChange={onChangeHandler} 
                        value={data.country} 
                        type="text" 
                        placeholder='Country' 
                    />
                </div>
                <input 
                    required 
                    name='phone' 
                    onChange={onChangeHandler} 
                    value={data.phone} 
                    type="text" 
                    placeholder='Phone' 
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit' disabled={loading}>
                        {loading ? "PROCESSING..." : "PROCEED TO PAYMENT"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder