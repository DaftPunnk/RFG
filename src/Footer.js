// src/Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white text-center p-4">
            © {new Date().getFullYear()} RFG. All Rights Reserved.
        </footer>
    );
};

export default Footer;
