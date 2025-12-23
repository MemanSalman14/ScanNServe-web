
import React from 'react'
import './HowItWorks.css'

const HowItWorks = () => {
  return (
    <div className='how-it-works' id='how-it-works'>
      <div className='how-it-works-header'>
        <h2>How It Works</h2>
        <p>Experience seamless dining in just three simple steps</p>
      </div>
      
      <div className='how-it-works-steps'>
        <div className='step'>
          <div className='step-number'>01</div>
          <div className='step-icon'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 8h2v2H8V8zm6 0h2v2h-2V8zm-6 6h2v2H8v-2zm6 0h2v2h-2v-2z" fill="currentColor"/>
            </svg>
          </div>
          <h3>Scan QR Code</h3>
          <p>Simply scan the QR code at your table to access our digital menu instantly</p>
        </div>

        <div className='step'>
          <div className='step-number'>02</div>
          <div className='step-icon'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>Browse & Order</h3>
          <p>Explore our menu categories and select your favorite dishes with ease</p>
        </div>

        <div className='step'>
          <div className='step-number'>03</div>
          <div className='step-icon'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Relax & Enjoy</h3>
          <p>Sit back and relax while we prepare and serve your order to your table</p>
        </div>
      </div>
     
       <img 
        src="/sideimg-dish2.png" 
        alt="Delicious Dish" 
        className='how-it-works-side-image'
      />
    
    </div>
  )
}

export default HowItWorks