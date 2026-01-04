import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleSectionClick = (e, sectionId, menuName) => {
        e.preventDefault();
        setMenu(menuName);
        setMobileMenuOpen(false); // Close mobile menu
        
        if (location.pathname !== '/') {
            navigate('/');
            scrollToSection(sectionId);
        } else {
            scrollToSection(sectionId);
        }
    };

    const handleNavLinkClick = (menuName) => {
        setMenu(menuName);
        setMobileMenuOpen(false); // Close mobile menu
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
              <>
            <div className={`Navbar ${mobileMenuOpen ? 'menu-open' : ''}`}>
                <Link to='/' onClick={() => handleNavLinkClick("home")}>
                    <img src={assets.Navbar_logo} alt="" className="logo" />
                </Link>
                
                {/* Desktop Menu */}
                <ul className="Navbar-menu">
                    <Link 
                        to='/' 
                        onClick={() => handleNavLinkClick("home")} 
                        className={menu === "home" ? "active" : ""}
                    >
                        Home
                    </Link>
                    <a 
                        href='#explore-menu' 
                        onClick={(e) => handleSectionClick(e, 'explore-menu', 'menu')} 
                        className={menu === "menu" ? "active" : ""}
                    >
                        Menus
                    </a>
                    <Link 
                        to='/about' 
                        onClick={() => handleNavLinkClick("about")} 
                        className={menu === "about" ? "active" : ""}
                    >
                        About Us
                    </Link>
                      <Link 
                        to='/myorders' 
                        onClick={() => handleNavLinkClick("myorders")} 
                        className={menu === "myorders" ? "active" : ""}
                    >
                        My Orders
                    </Link>
                    <a 
                        href='#how-it-works' 
                        onClick={(e) => handleSectionClick(e, 'how-it-works', 'how-it-works')} 
                        className={menu === "how-it-works" ? "active" : ""}
                    >
                        How it works
                    </a>
                    <a 
                        href='#footer' 
                        onClick={(e) => handleSectionClick(e, 'footer', 'contact-us')} 
                        className={menu === "contact-us" ? "active" : ""}
                    >
                        Contact us
                    </a>
                </ul>

            <div className="Navbar-right">
               
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
                    </div>
                </SignedIn>

                  {/* Hamburger Menu Icon */}
                    <div 
                        className={`navbar-hamburger ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            </div>
        </div>

          {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
            ></div>

           {/* Mobile Menu */}
            <div className={`Navbar-menu-mobile ${mobileMenuOpen ? 'active' : ''}`}>
                {/* Mobile Menu Header with Logo and Close Button */}
                <div className="mobile-menu-header">
                    <Link to='/' onClick={() => handleNavLinkClick("home")}>
                        <img src={assets.Navbar_logo} alt="" className="logo" />
                    </Link>
                    <div className="mobile-menu-close" onClick={toggleMobileMenu}>
                        <span></span>
                    </div>
                </div>

                {/* Mobile Menu Links */}
                <div className="mobile-menu-links">
                    <Link 
                        to='/' 
                        onClick={() => handleNavLinkClick("home")} 
                        className={menu === "home" ? "active" : ""}
                    >
                        Home
                    </Link>
                    <a 
                        href='#explore-menu' 
                        onClick={(e) => handleSectionClick(e, 'explore-menu', 'menu')} 
                        className={menu === "menu" ? "active" : ""}
                    >
                        Menus
                    </a>
                    <Link 
                        to='/about' 
                        onClick={() => handleNavLinkClick("about")} 
                        className={menu === "about" ? "active" : ""}
                    >
                        About Us
                    </Link>
                     <Link 
                        to='/myorders' 
                        onClick={() => handleNavLinkClick("myorders")} 
                        className={menu === "myorders" ? "active" : ""}
                    >
                        My Orders
                    </Link>
                    <a 
                        href='#how-it-works' 
                        onClick={(e) => handleSectionClick(e, 'how-it-works', 'how-it-works')} 
                        className={menu === "how-it-works" ? "active" : ""}
                    >
                        How it works
                    </a>
                    <a 
                        href='#footer' 
                        onClick={(e) => handleSectionClick(e, 'footer', 'contact-us')} 
                        className={menu === "contact-us" ? "active" : ""}
                    >
                        Contact us
                    </a>
                </div>
            </div>
        </>
    )
}

export default Navbar