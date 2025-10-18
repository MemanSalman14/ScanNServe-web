import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.Footer_logo} alt="" />
                <p>ScanNServe transforms your dine-in experience by letting you order directly from your table. Simply scan, browse the digital menu, and place your order—no waiting for staff. Enjoy quick, convenient, and contactless ordering every time you visit the restaurant.</p>
                <div className="footer-social-icons">
                  <img src={assets.facebook_icon} alt="" />
                  <img src={assets.twitter_icon} alt="" />
                  <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                   <li>Home</li>
                   <li>About us</li>
                   <li>Delivery</li>
                   <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
               <h2>GET IN TOUCH</h2>
               <ul>
                  <li>+1-212-456-7890</li>
                  <li>contact@scannserve.com</li>
               </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 © ScanNServe.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
