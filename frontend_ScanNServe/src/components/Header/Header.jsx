import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'> 
       <div className="header-contents">
            {/* 
            <h1>Food Delivery</h1>  
            */}
            <h2>Order your favourite food online</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted from the famous michelin star chef Tanisha Kapila</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header