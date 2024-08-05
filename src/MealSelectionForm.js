import React, { useState } from 'react';
import { useReservation } from './ReservationContext';

function MealSelectionForm({ nextStep }) {
  const { updateReservation } = useReservation();
  const [selectedMeal, setSelectedMeal] = useState('');

  const handleMealSelection = (mealType) => {
    setSelectedMeal(mealType);
    updateReservation((prevReservation) => ({
      ...prevReservation,
      mealType: mealType,
    }));
    nextStep();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center p-6 bg-black rounded shadow border border-white max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">Select a Meal</h1>
        <div className="flex space-x-4">
          <button
            className={`py-3 px-6 rounded ${
              selectedMeal === 'lunch' ? 'bg-white text-black' : 'bg-black text-white border border-white'
            }`}
            onClick={() => handleMealSelection('lunch')}
          >
            Lunch
          </button>
          <button
            className={`py-3 px-6 rounded bg-gray-500 text-gray-700 border border-gray-700 cursor-not-allowed`}
            disabled
            /* className={`py-3 px-6 rounded ${
              selectedMeal === 'dinner' ? 'bg-white text-black' : 'bg-black text-white border border-white'
            }`}
            onClick={() => handleMealSelection('dinner')} */
          >
            Dinner
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealSelectionForm;







