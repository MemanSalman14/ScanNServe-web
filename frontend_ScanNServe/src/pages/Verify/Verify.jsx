import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, {
                success,
                orderId
            });
            
            if (response.data.success) {
                toast.success("Payment successful!");
                navigate("/myorders");
            }
            else {
                toast.error("Payment failed!");
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("Error verifying payment");
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>Verifying your payment...</p>
        </div>
    )
}

export default Verify