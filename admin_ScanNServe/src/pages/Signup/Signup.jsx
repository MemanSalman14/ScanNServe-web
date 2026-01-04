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
          <h1>ScanNServe Admin</h1>
          <p>Create Admin Account</p>
             <span className='signup-badge'>Join Our Team</span>
        </div>
        <SignUp 
          routing="path" 
          path="/signup"
          signInUrl="/login"
          afterSignUpUrl="/add"
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: '#c9a668',
                fontSize: '15px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                '&:hover': {
                  backgroundColor: '#b89558'
                }
              },
              card: {
                boxShadow: 'none',
                border: 'none'
              },
              headerTitle: {
                color: '#1a3129',
                fontSize: '24px',
                fontWeight: '700'
              },
              headerSubtitle: {
                color: '#666'
              },
              socialButtonsBlockButton: {
                border: '2px solid #e0e0e0',
                '&:hover': {
                  borderColor: '#c9a668'
                }
              },
              formFieldInput: {
                border: '2px solid #e0e0e0',
                '&:focus': {
                  borderColor: '#c9a668',
                  boxShadow: '0 0 0 3px rgba(201, 166, 104, 0.1)'
                }
              },
              footerActionLink: {
                color: '#c9a668',
                '&:hover': {
                  color: '#b89558'
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default Signup