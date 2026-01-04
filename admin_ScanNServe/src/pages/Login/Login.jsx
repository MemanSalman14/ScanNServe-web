import React, { useEffect } from 'react'
import './Login.css'
import { SignIn, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/add')
    }
  }, [isSignedIn, navigate])

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-header'>
          <h1>ScanNServe Admin</h1>
          <p>Restaurant Management System</p>
          <span className='login-badge'>Admin Portal</span>
        </div>
        <SignIn 
          routing="path" 
          path="/login"
          signUpUrl="/signup"
          afterSignInUrl="/add"
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

export default Login