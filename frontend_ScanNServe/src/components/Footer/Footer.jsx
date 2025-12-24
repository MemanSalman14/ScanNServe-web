import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer' id='footer'>
      <div className="footer-top">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-brand">
            <img src={assets.Footer_logo} alt="ScanNServe Logo" className="footer-logo" />
            <p className="footer-tagline">Smart Dining at Your Fingertips</p>
            <p className="footer-description">
              Experience the future of dining with our innovative QR-based ordering system. 
              Scan, browse, order, and enjoy—all from the comfort of your table.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src={assets.facebook_icon} alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img src={assets.twitter_icon} alt="Twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src={assets.linkedin_icon} alt="LinkedIn" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="/#explore-menu">Menu</a></li>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/myorders">My Orders</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer-features">
            <h3>Features</h3>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>
                </svg>
                Digital Menu
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                Contactless Ordering
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
                Real-Time Tracking
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Flexible Payment
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Personalized Service
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Get In Touch</h3>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:contact@scannserve.com">contact@scannserve.com</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:+12124567890">+1 (212) 456-7890</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>123 Main Street<br/>Vadodara, GJ 390001</span>
              </li>
            </ul>
            <div className="footer-hours">
              <h4>Opening Hours</h4>
              <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
              <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} ScanNServe. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms">Terms of Service</Link>
              <span>•</span>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
            {/*
            <div className="footer-payment">
              <span>We Accept:</span>
              <div className="payment-icons">
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#1434CB"/>
                  <text x="50%" y="50%" fontSize="14" fill="white" textAnchor="middle" dy=".35em" fontWeight="bold">VISA</text>
                </svg>
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#EB001B"/>
                  <circle cx="18" cy="16" r="10" fill="#F79E1B" opacity="0.8"/>
                  <circle cx="30" cy="16" r="10" fill="#FF5F00" opacity="0.8"/>
                </svg>
                <svg viewBox="0 0 48 32" width="40" height="26">
                  <rect width="48" height="32" rx="4" fill="#0070BA"/>
                  <text x="50%" y="50%" fontSize="10" fill="white" textAnchor="middle" dy=".35em" fontWeight="bold">PayPal</text>
                </svg>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer