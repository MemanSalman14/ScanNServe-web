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
          <h1>🍽️ ScanNServe Admin</h1>
          <p>Restaurant Management System</p>
        </div>
        <SignIn 
          routing="path" 
          path="/login"
          signUpUrl="/signup"
          afterSignInUrl="/add"
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

export default Login