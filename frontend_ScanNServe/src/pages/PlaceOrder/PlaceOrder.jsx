import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const { getTotalCartAmount, food_list, cartItems, url, clearCart } = useContext(StoreContext);
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [data, setData] = useState({
    tableNumber: "",
    customerName: "",
    phone: "",
    specialInstructions: ""
  })

  const [paymentMethod, setPaymentMethod] = useState("PayAtCounter");

  useEffect(() => {
    if (user) {
      setData(prevData => ({
        ...prevData,
        customerName: user.fullName || `${user.firstName} ${user.lastName}`.trim() || "",
        phone: user.phoneNumbers?.[0]?.phoneNumber || ""
      }));
    }
  }, [user]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    
    if (!data.tableNumber) {
      toast.error("Please enter your table number");
      return;
    }
    
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      tableNumber: data.tableNumber,
      customerName: data.customerName,
      phone: data.phone,
      specialInstructions: data.specialInstructions,
      items: orderItems,
      amount: getTotalCartAmount(),
      paymentMethod: paymentMethod,
      orderType: "Dine-In"
    }
    
    try {
      const token = await getToken();
      
      if (paymentMethod === "PayAtCounter") {
        let response = await axios.post(url + "/api/order/place-dinein", orderData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          clearCart();
          toast.success("Order placed successfully! Your order number is " + response.data.orderNumber);
          navigate('/myorders');
        } else {
          toast.error("Error placing order");
        }
      } else {
        // Online payment (Stripe/UPI)
        let response = await axios.post(url + "/api/order/place-online", orderData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          toast.error("Error placing order");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  }

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [isSignedIn])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">🍽️ Dine-In Details</p>
        
        <div className="table-number-input">
          <label htmlFor="tableNumber">Table Number *</label>
          <input 
            required 
            name='tableNumber' 
            onChange={onChangeHandler} 
            value={data.tableNumber} 
            type="text" 
            placeholder='Enter your table number' 
            className='table-input'
          />
        </div>

        <div className="customer-info">
          <label htmlFor="customerName">Your Name</label>
          <input 
            required 
            name='customerName' 
            onChange={onChangeHandler} 
            value={data.customerName} 
            type="text" 
            placeholder='Your name' 
          />
        </div>

        <div className="customer-info">
          <label htmlFor="phone">Phone Number</label>
          <input 
            required 
            name='phone' 
            onChange={onChangeHandler} 
            value={data.phone} 
            type="tel" 
            placeholder='Phone number' 
          />
        </div>

        <div className="special-instructions">
          <label htmlFor="specialInstructions">Special Instructions (Optional)</label>
          <textarea 
            name='specialInstructions' 
            onChange={onChangeHandler} 
            value={data.specialInstructions} 
            rows="4"
            placeholder='Any dietary restrictions or special requests...'
          />
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>GST (5%)</p>
              <p>₹{Math.round(getTotalCartAmount() * 0.05)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + Math.round(getTotalCartAmount() * 0.05)}</b>
            </div>
          </div>
          
          {/* Payment Method Selection */}
          <div className="payment-method">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="payment" 
                  value="PayAtCounter" 
                  checked={paymentMethod === "PayAtCounter"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💵 Pay at Counter</span>
              </label>
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="payment" 
                  value="PayNow" 
                  checked={paymentMethod === "PayNow"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 Pay Now (Online)</span>
              </label>
            </div>
          </div>
          
          <button type='submit' className='place-order-btn'>
            {paymentMethod === "PayAtCounter" ? "🍴 PLACE ORDER" : "💳 PAY & ORDER"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder