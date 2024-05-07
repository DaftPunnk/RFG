import React, { useState, useEffect } from 'react';
import { useReservation } from './ReservationContext';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function TimeDateSelectionForm({ nextStep, prevStep }) {
  const { reservation, updateReservation } = useReservation();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(reservation.time);
  const [seatAvailability, setSeatAvailability] = useState({});

  useEffect(() => {
    const times = reservation.mealType === 'lunch' ? ['12:00', '13:00'] : ['18:00', '19:00'];
    setAvailableTimes(times);
    
    const fetchSeatAvailability = async (selectedDate) => {
      try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        const response = await axios.get(`http://localhost:3001/api/seat-availability/${formattedDate}`);
        setSeatAvailability(response.data); // Assuming response.data is an object like {'12:00': 6, '13:00': 8}
      } catch (error) {
        console.error('Error fetching seat availability:', error);
      }
    };

    if (reservation.date) {
      fetchSeatAvailability(reservation.date);
    }
  }, [reservation.date, reservation.mealType]);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    updateReservation({ ...reservation, time: time });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded shadow">
      <DatePicker
        selected={reservation.date}
        onChange={(date) => updateReservation({ ...reservation, date })}
        minDate={new Date()}
        filterDate={(date) => date.getDay() !== 0} // Disables Sundays
        inline
        className="mb-4"
      />
      <div className="flex justify-center my-4">
        {availableTimes.map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded mx-1 ${selectedTime === time ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-600'} text-white ${seatAvailability[time] === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTimeSelection(time)}
            disabled={seatAvailability[time] === 0}
            title={`${time} - ${seatAvailability[time] || 0} seats available`}
          >
            {time}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center my-4">
        <button
          className="bg-red-400 text-white rounded px-4 py-2 mx-1 hover:bg-red-500"
          onClick={() => updateReservation({ ...reservation, guests: Math.max(1, reservation.guests - 1) })}
        >
          -
        </button>
        <span className="text-xl mx-2">{reservation.guests} Guests</span>
        <button
          className="bg-green-400 text-white rounded px-4 py-2 mx-1 hover:bg-green-500"
          onClick={() => updateReservation({ ...reservation, guests: Math.min(8, reservation.guests + 1) })}
        >
          +
        </button>
      </div>
      <div className="flex justify-between w-full mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TimeDateSelectionForm;









