import React from 'react';
import './App.css'; // Ensure this is the correct path to your CSS file
import backgroundImage from './image/contactbg.jpg'; // Import the background image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactInfo = () => {
    return (
        <div className="contact-page-container">
            <div className="contact-image-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 className="contact-title">Contact</h1>
            </div>
            <div className="contact-details-section">
                <div className="left-section">
                    <p className="get-in-touch">Get in touch</p>
                    <p className="contact-us">Contact us</p>
                </div>
                <div className="right-section">
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" /> 1/333 Parnell Road, Auckland 1052</p>
                    <p><FontAwesomeIcon icon={faPhoneAlt} className="contact-icon" /> (+64) 021 108 2668</p>
                    <p><FontAwesomeIcon icon={faEnvelope} className="contact-icon" /> DINING@RFG.NZ</p>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;






