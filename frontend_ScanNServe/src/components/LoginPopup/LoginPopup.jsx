import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { SignIn, SignUp } from '@clerk/clerk-react'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")

    return (
        <div className='login-popup'>
            <div className="login-popup-container clerk-container">
                <div className="login-popup-title">
                    <h2>{currState === "Login" ? "Sign In" : "Sign Up"}</h2>
                    <div className="close-icon" onClick={() => setShowLogin(false)}>
                        ×
                    </div>
                </div>
                
                <div className="clerk-auth-wrapper">
                    {currState === "Login" ? (
                        <SignIn 
                            afterSignInUrl="/"
                            routing="hash"
                            appearance={{
                                elements: {
                                    formButtonPrimary: {
                                        backgroundColor: '#c9a668',
                                        '&:hover': {
                                            backgroundColor: '#b89558'
                                        }
                                    },
                                    card: {
                                        boxShadow: 'none',
                                        width: '100%'
                                    },
                                    headerTitle: {
                                        display: 'none'
                                    },
                                    headerSubtitle: {
                                        display: 'none'
                                    },
                                    socialButtonsBlockButton: {
                                        border: '2px solid #e0e0e0',
                                        '&:hover': {
                                            backgroundColor: '#f8f8f8',
                                            borderColor: '#c9a668'
                                        }
                                    },
                                    formFieldInput: {
                                        border: '2px solid #e0e0e0',
                                        '&:focus': {
                                           border: '2px solid #c9a668',
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
                    ) : (
                        <SignUp 
                            afterSignUpUrl="/"
                            routing="hash"
                            appearance={{
                                elements: {
                                    formButtonPrimary: {
                                        backgroundColor: '#c9a668',
                                        '&:hover': {
                                            backgroundColor: '#b89558'
                                        }
                                    },
                                    card: {
                                        boxShadow: 'none',
                                        width: '100%'
                                    },
                                    headerTitle: {
                                        display: 'none'
                                    },
                                    headerSubtitle: {
                                        display: 'none'
                                    },
                                    socialButtonsBlockButton: {
                                        border: '2px solid #e0e0e0',
                                        '&:hover': {
                                            backgroundColor: '#f8f8f8',
                                            borderColor: '#c9a668'
                                        }
                                    },
                                    formFieldInput: {
                                       border: '2px solid #e0e0e0',
                                        '&:focus': {
                                           border: '2px solid #c9a668',
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
                    )}
                </div>

                <div className="login-popup-toggle">
                    {currState === "Login" ? (
                        <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPopup



















