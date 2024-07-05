import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ReservationProvider } from './ReservationContext';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import ReservationManager from './ReservationManager';
import MenuPage from './MenuPage';
import ContactInfo from './ContactInfo';
import ThankYou from './ThankYou';
import AboutPage from './AboutPage';
import AdminApp from './admin/AdminApp';
import './App.css';

function App() {
  return (
    <ReservationProvider>
                    <NavBar />
                    <Footer />

      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservation" element={<ReservationManager />} />
        <Route path="/contact" element={<ContactInfo />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </ReservationProvider>
  );
}

export default App;

























