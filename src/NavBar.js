import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReservation } from './ReservationContext';
import logo from './image/logo.png';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { updateReservation } = useReservation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleReservationClick = () => {
        updateReservation({
            mealType: '',
            date: null,
            time: '',
            guests: 1,
            name: '',
            phone: '',
            email: ''
        });
        closeMenu();
        navigate('/reservation');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo-link" onClick={closeMenu}>
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <button onClick={toggleMenu} className="hamburger-btn" aria-label="Toggle menu">
                <svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3z" fill="white"/>
                    <path d="M0 7h20v2H0V7z" fill="white"/>
                    <path d="M0 11h20v2H0v-2z" fill="white"/>
                </svg>
            </button>
            <div className={`menu ${isOpen ? 'open' : 'closed'}`}>
                <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link> {/* Update link to /about */}
                <Link to="/menu" className="nav-link" onClick={closeMenu}>Menu</Link>
                <Link to="/reservation" className="nav-link" onClick={handleReservationClick}>Reservation</Link>
                <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
            </div>
        </nav>
    );
};

export default NavBar;