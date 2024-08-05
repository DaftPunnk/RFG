import React from 'react';
import './App.css'; // Ensure this is the correct path to your CSS file
import backgroundImage from './image/contactbg.jpg'; // Import the background image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ContactInfo = () => {
    const navigate = useNavigate();

    const handleReservationClick = (event) => {
        event.preventDefault();
        navigate('/reservation');
    };

    return (
        <div className="contact-page-container">
            <div className="contact-image-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 className="contact-title">Contact</h1>
            </div>
            <div className="contact-details-section">
                <div className="left-section">
                    <p className="get-in-touch">Opening hours</p>
                    <p>Lunch | Monday - Saturday<br />11:00 - 16:00</p>
                    <p>Dinner | 6:30pm & 7:30pm<br />Reservation only, <a href="#" className="reservation-link" onClick={handleReservationClick}>click here</a></p>
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









