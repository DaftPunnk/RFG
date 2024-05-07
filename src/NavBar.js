import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './image/logo.jpg';  // Update path as necessary

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <button onClick={toggleMenu} className="hamburger-btn">
                <svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3z" fill="white"/>
                    <path d="M0 7h20v2H0V7z" fill="white"/>
                    <path d="M0 11h20v2H0v-2z" fill="white"/>
                </svg>
            </button>
            <div className={`menu-items ${isOpen ? 'open' : ''}`}>
                <a href="#about" className="nav-link">About</a>
                <Link to="/menu" className="nav-link">Menu</Link>
                <a href="#reservation" className="nav-link">Reservation</a>
                <Link to="/contact" className="nav-link">Contact</Link>
            </div>
        </nav>
    );
};

export default NavBar;















