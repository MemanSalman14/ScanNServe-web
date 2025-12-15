import React, { useEffect } from 'react'
import './Signup.css'
import { SignUp, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/add')
    }
  }, [isSignedIn, navigate])

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <div className='signup-header'>
          <h1>🍽️ ScanNServe Admin</h1>
          <p>Create Admin Account</p>
        </div>
        <SignUp 
          routing="path" 
          path="/signup"
          signInUrl="/login"
          afterSignUpUrl="/add"
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: 'tomato',
                '&:hover': {
                  backgroundColor: '#ff6347'
                }
              },
              card: {
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default Signup