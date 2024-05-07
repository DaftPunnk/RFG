// UserDetailsForm.js
import React from 'react';

function UserDetailsForm({ reservation, updateReservation, nextStep, prevStep }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    updateReservation({ [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <input className="input bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
             name="name" placeholder="Name" value={reservation.name} onChange={handleInput} />
      <input className="input bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
             name="phone" placeholder="Phone" value={reservation.phone} onChange={handleInput} />
      <input className="input bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
             name="email" placeholder="Email" value={reservation.email} onChange={handleInput} />
      <div className="flex justify-around w-full">
        <button className="bg-gray-400 text-white rounded px-4 py-2 mx-1 hover:bg-gray-500" onClick={prevStep}>
          Back
        </button>
        <button className="bg-blue-500 text-white rounded px-4 py-2 mx-1 hover:bg-blue-600" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UserDetailsForm;

