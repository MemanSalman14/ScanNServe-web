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
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                
                <div className="clerk-auth-wrapper">
                    {currState === "Login" ? (
                        <SignIn 
                            afterSignInUrl="/"
                            routing="hash"
                            appearance={{
                                elements: {
                                    formButtonPrimary: {
                                        backgroundColor: 'tomato',
                                        '&:hover': {
                                            backgroundColor: '#ff6347'
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
                                        border: '1px solid #d4d4d4',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    },
                                    formFieldInput: {
                                        border: '1px solid #c9c9c9',
                                        '&:focus': {
                                            border: '1px solid tomato'
                                        }
                                    },
                                    footerActionLink: {
                                        color: 'tomato',
                                        '&:hover': {
                                            color: '#ff6347'
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
                                        backgroundColor: 'tomato',
                                        '&:hover': {
                                            backgroundColor: '#ff6347'
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
                                        border: '1px solid #d4d4d4',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    },
                                    formFieldInput: {
                                        border: '1px solid #c9c9c9',
                                        '&:focus': {
                                            border: '1px solid tomato'
                                        }
                                    },
                                    footerActionLink: {
                                        color: 'tomato',
                                        '&:hover': {
                                            color: '#ff6347'
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