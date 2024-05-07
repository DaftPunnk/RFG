import React from 'react';
import axios from 'axios'; // Ensure you've installed axios with npm install axios

function SummaryForm({ reservation, prevStep }) {
  const handleSubmit = async () => {
    try {
        await axios.post('http://localhost:3001/api/reservations', reservation);
        alert('Booking Confitmed!'); // Alert the success message
    } catch (error) {
        console.error('There was an error saving the reservation', error);
        alert('There was an error saving the reservation.');
    }
};

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reservation Summary</h2>
      <div className="mb-2"><strong>Meal:</strong> {reservation.mealType}</div>
      <div className="mb-2"><strong>Date:</strong> {reservation.date.toLocaleDateString()}</div>
      <div className="mb-2"><strong>Time:</strong> {reservation.time}</div>
      <div className="mb-2"><strong>Guests:</strong> {reservation.guests}</div>
      <div className="mb-2"><strong>Name:</strong> {reservation.name}</div>
      <div className="mb-2"><strong>Phone:</strong> {reservation.phone}</div>
      <div className="mb-2"><strong>Email:</strong> {reservation.email}</div>
      <div className="flex justify-between w-full mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default SummaryForm;

