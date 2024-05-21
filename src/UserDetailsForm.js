import React, { useState } from 'react';
import { useReservation } from './ReservationContext';

function UserDetailsForm({ nextStep, prevStep }) {
  const { reservation, updateReservation } = useReservation();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    updateReservation({ ...reservation, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateName = (name) => {
    const re = /^[A-Za-z\s]+$/;
    return re.test(String(name));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10,15}$/;
    return re.test(String(phone));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!reservation.name) newErrors.name = 'Name is required';
    if (reservation.name && !validateName(reservation.name)) newErrors.name = 'Name can only contain letters';
    if (!reservation.phone) newErrors.phone = 'Phone is required';
    if (reservation.phone && !validatePhone(reservation.phone)) newErrors.phone = 'Phone is invalid';
    if (!reservation.email) newErrors.email = 'Email is required';
    if (reservation.email && !validateEmail(reservation.email)) newErrors.email = 'Email is invalid';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStep();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center p-6 bg-black rounded shadow border border-white max-w-lg w-full">
        <input
          className={`input bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 ${errors.name && 'border-red-500'}`}
          name="name"
          placeholder="Name"
          value={reservation.name}
          onChange={handleInput}
        />
        {errors.name && <div className="text-red-500 text-sm mb-2">{errors.name}</div>}
        <input
          className={`input bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 ${errors.phone && 'border-red-500'}`}
          name="phone"
          placeholder="Phone"
          value={reservation.phone}
          onChange={handleInput}
        />
        {errors.phone && <div className="text-red-500 text-sm mb-2">{errors.phone}</div>}
        <input
          className={`input bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 ${errors.email && 'border-red-500'}`}
          name="email"
          placeholder="Email"
          value={reservation.email}
          onChange={handleInput}
        />
        {errors.email && <div className="text-red-500 text-sm mb-2">{errors.email}</div>}
        <div className="flex justify-around w-full">
          <button
            className="bg-black text-white border border-white rounded px-4 py-2 mx-1 hover:bg-gray-700"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            className="bg-black text-white border border-white rounded px-4 py-2 mx-1 hover:bg-gray-700"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsForm;







