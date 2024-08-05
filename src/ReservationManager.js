import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import TermsAndConditions from './TermsAndConditions';
import MealSelectionForm from './MealSelectionForm';
import TimeDateSelectionForm from './TimeDateSelectionForm';
import UserDetailsForm from './UserDetailsForm';
import SummaryForm from './SummaryForm';
import ThankYou from './ThankYou';
import { useReservation } from './ReservationContext';

function ReservationManager() {
  const [step, setStep] = useState(1);
  const { updateReservation } = useReservation();
  const location = useLocation();

  const resetReservation = useCallback(() => {
    updateReservation({
      mealType: '',
      date: null,
      time: '',
      guests: 1,
      name: '',
      phone: '',
      email: ''
    });
    setStep(1);
  }, [updateReservation]);

  useEffect(() => {
    if (location.pathname === '/reservation') {
      console.log('Resetting reservation and step');
      resetReservation();
    }
  }, [location.pathname, resetReservation]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <TermsAndConditions nextStep={nextStep} />;
      case 2:
        return <MealSelectionForm nextStep={nextStep} />;
      case 3:
        return <TimeDateSelectionForm nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <UserDetailsForm nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <SummaryForm prevStep={prevStep} nextStep={nextStep} />;
      case 6:
        return <ThankYou />;
      default:
        return <TermsAndConditions nextStep={nextStep} />;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
}

export default ReservationManager;
















