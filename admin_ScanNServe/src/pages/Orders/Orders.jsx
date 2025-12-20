import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { useAuth } from '@clerk/clerk-react'

const Orders = ({ url }) => {

  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    try {
      const token = await getToken();
      
      if (!token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const response = await axios.get(url + "/api/order/list", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.error("Error fetching orders")
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else if (error.response?.status === 403) {
        toast.error("Access denied. Admin privileges required.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
      }
    }
  }

  const statusHandler = async (event, orderId) => {
    if (!isLoaded || !isSignedIn) {
      toast.error("Please sign in to update status");
      return;
    }

    try {
      const token = await getToken();
      
      if (!token) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        await fetchAllOrders()
        toast.success("Status Updated")
      }
    } catch (error) {
      console.error("Error updating status:", error);
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else if (error.response?.status === 403) {
        toast.error("Access denied. Admin privileges required.");
      } else {
        toast.error(error.response?.data?.message || "Failed to update status");
      }
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchAllOrders()
    }
  }, [isLoaded, isSignedIn])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='order add'>
      <h3>Order Management</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-number'>Order #{order.orderNumber}</p>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>👤 {order.customerName}</p>
              <p className='order-item-phone'>📞 {order.phone}</p>
              {order.specialInstructions && (
                <p className='special-instructions'>📝 {order.specialInstructions}</p>
              )}
            </div>
            <p className='table-number'>🪑 Table {order.tableNumber}</p>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <p className={`payment-method ${order.paymentMethod === 'PayAtCounter' ? 'counter' : 'online'}`}>
              {order.paymentMethod === 'PayAtCounter' ? '💵 Counter' : '💳 Paid'}
            </p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Order Received">Order Received</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready to Serve">Ready to Serve</option>
              <option value="Served">Served</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders