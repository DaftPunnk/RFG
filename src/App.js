import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ReservationProvider } from './ReservationContext';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import MealSelectionForm from './MealSelectionForm';
import TimeDateSelectionForm from './TimeDateSelectionForm';
import UserDetailsForm from './UserDetailsForm';
import SummaryForm from './SummaryForm';
import MenuPage from './MenuPage';
import ContactInfo from './ContactInfo';

function App() {
  return (
    <Router>
      <ReservationProvider> 
        <NavBar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<MealSelectionForm />} />
          <Route path="/reservation/date-time" element={<TimeDateSelectionForm />} />
          <Route path="/reservation/details" element={<UserDetailsForm />} />
          <Route path="/reservation/summary" element={<SummaryForm />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <Footer />
      </ReservationProvider>
    </Router>
  );
}

export default App;










