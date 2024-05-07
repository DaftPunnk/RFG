import React from 'react';
import { useReservation } from './ReservationContext';

function MealSelectionForm({ nextStep }) {
  const { updateReservation } = useReservation();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Choose your meal</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() => { updateReservation({ mealType: 'lunch' }); nextStep(); }}>
        Lunch
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
        onClick={() => { updateReservation({ mealType: 'dinner' }); nextStep(); }}>
        Dinner
      </button>
    </div>
  );
}

export default MealSelectionForm;


