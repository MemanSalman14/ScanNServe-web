import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useAuth } from '@clerk/clerk-react';

const MyOrders = () => {

    const { url, getAuthHeaders } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isSignedIn } = useAuth();

    const fetchOrders = async () => {
        if (!isSignedIn) {
            setLoading(false);
            return;
        }

        try {
            const authHeaders = await getAuthHeaders();
            const response = await axios.post(
                `${url}/api/order/userorders`, 
                {}, 
                authHeaders
            );
            setData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSignedIn) {
            fetchOrders();
        }
    }, [isSignedIn])

    if (loading) {
        return <div className='my-orders'><p>Loading orders...</p></div>
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders yet. Start ordering now!</p>
                ) : (
                    data.map((order, index) => {
                        return (
                            <div key={index} className='my-orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}</p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default MyOrders