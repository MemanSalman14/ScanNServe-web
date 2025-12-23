import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import './App.css'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import About from './pages/About/About'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  const [searchParams] = useSearchParams()

   // Handle QR code scan
  useEffect(() => {
    const tableFromQR = searchParams.get('table')
    if (tableFromQR) {
      // Save table number to localStorage
      localStorage.setItem('scannedTable', tableFromQR)
      
      // Show welcome message
      toast.success(`Welcome! You're at Table ${tableFromQR}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Optional: Clear the URL parameter
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [searchParams])



  return (
    <>
     <ToastContainer />
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='App'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />}/>
          <Route path='/myorders' element={<MyOrders />}/>
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App