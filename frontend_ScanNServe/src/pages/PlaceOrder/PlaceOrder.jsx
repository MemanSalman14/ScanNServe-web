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
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    if (user) {
      setData(prevData => ({
        ...prevData,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || ""
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
    
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 10,
      paymentMethod: paymentMethod
    }
    
    try {
      const token = await getToken();
      
      if (paymentMethod === "COD") {
        // Place COD order directly
        let response = await axios.post(url + "/api/order/place-cod", orderData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          clearCart(); // Clear cart immediately
          toast.success("Order placed successfully!");
          navigate('/myorders');
        } else {
          toast.error("Error placing order");
        }
      } else {
        // Stripe payment
        let response = await axios.post(url + "/api/order/place", orderData, {
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
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
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
                  value="COD" 
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery (COD)</span>
              </label>
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="payment" 
                  value="Stripe" 
                  checked={paymentMethod === "Stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Pay Online (Card/UPI)</span>
              </label>
            </div>
          </div>
          
          <button type='submit'>
            {paymentMethod === "COD" ? "PLACE ORDER" : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder