import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useAuth } from '@clerk/clerk-react';

const MyOrders = () => {

  const { url } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const { getToken, isSignedIn } = useAuth();

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const response = await axios.post(url + "/api/order/userorders", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchOrders();
    }
  }, [isSignedIn])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <div className="order-header">
                <img src={assets.parcel_icon} alt="" />
                <div className="order-info">
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="table-info">🪑 Table {order.tableNumber}</p>
                </div>
              </div>
              
              <div className="order-items">
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}</p>
              </div>

              <div className="order-details">
                <p className="order-amount">₹{order.amount}</p>
                <p className="order-items-count">{order.items.length} Items</p>
                <p className="order-status">
                  <span className={`status-dot ${order.status.toLowerCase().replace(/\s/g, '-')}`}>●</span>
                  <b>{order.status}</b>
                </p>
                <p className={`payment-badge ${order.paymentMethod === 'PayAtCounter' ? 'counter' : 'online'}`}>
                  {order.paymentMethod === 'PayAtCounter' ? '💵 Pay at Counter' : '💳 Paid Online'}
                </p>
              </div>
              
              <button onClick={fetchOrders} className="refresh-btn">🔄 Refresh Status</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders