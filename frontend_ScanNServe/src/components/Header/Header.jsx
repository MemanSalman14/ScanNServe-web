import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <video 
        className='header-video' 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/header-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='header-overlay'></div>
      <div className='header-contents'>
        <h2>
          <span className='header-main'>SMART DINING</span>
          <span className='header-sub'>redefined</span>
          <span className='header-main'>AT YOUR TABLE</span>
        </h2>
      </div>
    </div>
  )
}

export default Header