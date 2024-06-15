import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ReservationProvider } from './ReservationContext';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import ReservationManager from './ReservationManager';
import MenuPage from './MenuPage';
import ContactInfo from './ContactInfo';
import ThankYou from './ThankYou'; // Import ThankYou component
import AboutPage from './AboutPage'; // Import AboutPage component
import './App.css';

function App() {
  return (
    <Router>
      <ReservationProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<ReservationManager />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/about" element={<AboutPage />} /> {/* Add route for AboutPage */}
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <Footer />
      </ReservationProvider>
    </Router>
  );
}

export default App;












