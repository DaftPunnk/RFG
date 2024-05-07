import React, { useState } from 'react';
import MealSelectionForm from './MealSelectionForm';
import TimeDateSelectionForm from './TimeDateSelectionForm';
import UserDetailsForm from './UserDetailsForm';
import SummaryForm from './SummaryForm';

function ReservationManager() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  return (
    <div>
      {step === 1 && <MealSelectionForm nextStep={nextStep} />}
      {step === 2 && <TimeDateSelectionForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <UserDetailsForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <SummaryForm prevStep={prevStep} />}
    </div>
  );
}

export default ReservationManager;
