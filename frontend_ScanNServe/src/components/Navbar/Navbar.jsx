import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='Navbar'>
            <Link to='/'><img src={assets.Navbar_logo} alt="" className="logo" /></Link>
            <ul className="Navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="Navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="Navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                
                <SignedOut>
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                </SignedOut>
                
                <SignedIn>
                    <div className='navbar-profile'>
                        <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10"
                                }
                            }}
                        />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>
                            <hr />
                        </ul>
                    </div>
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar