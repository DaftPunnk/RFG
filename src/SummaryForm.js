import React, { useState } from 'react';
import { useReservation } from './ReservationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function SummaryForm({ prevStep }) {
  const { reservation } = useReservation();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      await axios.post('http://localhost:3001/api/reservations', reservation);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error confirming booking:', error);
      setErrors({ confirm: 'Error confirming booking. Please try again.' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center p-6 bg-black rounded shadow border border-white max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">Reservation Summary</h1>
        <ul className="text-lg mb-4">
          <li><strong>Meal:</strong> {reservation.mealType.charAt(0).toUpperCase() + reservation.mealType.slice(1)}</li>
          <li><strong>Date:</strong> {moment(reservation.date).format('ddd MMM DD YYYY')}</li>
          <li><strong>Time:</strong> {reservation.time}</li>
          <li><strong>Guests:</strong> {reservation.guests}</li>
          <li><strong>Name:</strong> {reservation.name}</li>
          <li><strong>Phone:</strong> {reservation.phone}</li>
          <li><strong>Email:</strong> {reservation.email}</li>
          <li><strong>Note:</strong> {reservation.note}</li> {/* Add this line */}
        </ul>
        {errors.confirm && <div className="text-red-500 text-sm mb-2">{errors.confirm}</div>}
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            className="bg-white text-black border border-white hover:bg-gray-800 hover:text-white font-bold py-3 px-6 rounded"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            className="bg-green-500 text-white border border-white hover:bg-green-700 font-bold py-3 px-6 rounded"
            onClick={handleConfirm}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryForm;











