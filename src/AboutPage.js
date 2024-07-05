import React from 'react';
import './App.css';
import rawImage from './image/raw.png';
import flameImage from './image/flame.png';
import grillImage from './image/grill.png';

const AboutPage = () => {
    return (
        <div className="about-page-container">
            <div className="intro-container">
                <div className="intro-title">
                    <span className="about">ABOUT</span>
                    <span className="us">US</span>
                </div>
                <p className="intro-description">
                    RFG Restaurant, Raw Flame Grill Restaurant, is a contemporary French fine dining venue that blends innovative modern French culinary methods to offer a distinctive dining experience. Providing a 20 to 28 course tasting menu. Each dish is meticulously crafted by our team of expert chefs. 
                </p>
                
                <p className="intro-description">
                    At RFG Restaurant, we believe that fine dining is not just about eating, but about creating memorable moments. Whether you are celebrating a special occasion or simply indulging in the finer things in life, we are committed to making your visit an unforgettable culinary adventure.
                </p>
            </div>
            <div className="centered-container">
                <div className="about-section left">
                    <div className="text-content">
                        <h2 className="section-title">RAW</h2>
                        <p className="section-description">Preparing fresh, high-quality seafood and delicacies from the beautiful New Zealand waters.</p>
                    </div>
                    <div className="image-content">
                        <img src={rawImage} alt="Raw" className="section-image" />
                    </div>
                </div>
                <div className="about-section right">
                    <div className="text-content">
                        <h2 className="section-title">FLAME</h2>
                        <p className="section-description">Mastering the art of open flame cooking to bring out the natural flavors of premium ingredients.</p>
                    </div>
                    <div className="image-content">
                        <img src={flameImage} alt="Flame" className="section-image" />
                    </div>
                </div>
                <div className="about-section left">
                    <div className="text-content">
                        <h2 className="section-title">GRILL</h2>
                        <p className="section-description">A variety of high-quality meats and vegetables, grilled to perfection for an exquisite taste experience.</p>
                    </div>
                    <div className="image-content">
                        <img src={grillImage} alt="Grill" className="section-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;





