import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const { user } = useUser()

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img className='logo' src={assets.logo} alt="" />
      </div>
      <div className='navbar-right'>
        {user && (
          <div className='admin-info'>
            <span>Welcome, {user.firstName || 'Admin'}</span>
          </div>
        )}
        <UserButton 
          afterSignOutUrl="/login"
          appearance={{
            elements: {
              avatarBox: {
                width: '40px',
                height: '40px'
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default Navbar
