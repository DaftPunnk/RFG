import React from 'react';
import './App.css';  // or the correct path to your CSS file
import heroImage from './image/bg.jpg';  // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <h1 className="welcome-text">Welcome to Our Restaurant</h1>
            <div className="contact-info">
                <p>1/333 Parnell Road, Parnell, Auckland 1052</p>
                <p>021-1082668</p>
                <p>DINING@RFG.NZ</p>
                <a href="https://www.instagram.com/rfgrestaurant/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="instagram-icon" />
                    Instagram: rfgrestaurant
                </a>
            </div>
        </div>
    );
};

export default HeroSection;


