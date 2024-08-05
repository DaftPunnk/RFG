import React, { useState, useEffect } from 'react';
import { useReservation } from './ReservationContext';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import moment from 'moment';

function TimeDateSelectionForm({ nextStep, prevStep }) {
  const { reservation, updateReservation } = useReservation();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(reservation.time);
  const [seatAvailability, setSeatAvailability] = useState({});
  const [errors, setErrors] = useState({});
  const [fullyBooked, setFullyBooked] = useState(false);
  const [maxGuests, setMaxGuests] = useState(8);
  const [showAvailability, setShowAvailability] = useState(null);

  useEffect(() => {
    const times = reservation.mealType === 'lunch' ? ['12:00', '13:00'] : ['18:00', '19:00'];
    setAvailableTimes(times);

    const fetchSeatAvailability = async (selectedDate) => {
      try {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        const response = await axios.get(`http://localhost:3001/api/seat-availability/${formattedDate}`);
        setSeatAvailability(response.data);
        const allFull = times.every(time => response.data[time] === 0);
        setFullyBooked(allFull);
        if (response.data[reservation.time] !== undefined) {
          setMaxGuests(response.data[reservation.time]);
        } else {
          setMaxGuests(8);
        }
      } catch (error) {
        console.error('Error fetching seat availability:', error);
      }
    };

    if (reservation.date) {
      fetchSeatAvailability(reservation.date);
    }
  }, [reservation.date, reservation.mealType, reservation.time]);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    updateReservation({ ...reservation, time: time });
    setErrors((prevErrors) => ({ ...prevErrors, time: '' }));
    setShowAvailability(time);
    if (seatAvailability[time] !== undefined) {
      setMaxGuests(seatAvailability[time]);
      if (reservation.guests > seatAvailability[time]) {
        updateReservation({ ...reservation, guests: seatAvailability[time] });
      }
    } else {
      setMaxGuests(8);
    }
  };

  const handleDateChange = (date) => {
    updateReservation({ ...reservation, date, guests: 1 });
    setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
  };

  const handleGuestChange = (amount) => {
    if (amount >= 1 && amount <= maxGuests) {
      updateReservation({ ...reservation, guests: amount });
      setErrors((prevErrors) => ({ ...prevErrors, guests: '' }));
    }
  };

  const handleNoteChange = (event) => {
    updateReservation({ ...reservation, note: event.target.value });
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!reservation.date) newErrors.date = 'Date is required';
    if (!reservation.time) newErrors.time = 'Time is required';
    if (!reservation.guests) newErrors.guests = 'Number of guests is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStep();
  };

  const getDayClassName = (date) => {
    return date.getDay() === 0 ? 'react-datepicker__day--sunday tooltip' : '';
  };

  const isDayDisabled = (date) => {
    return date.getDay() === 0;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center p-6 bg-black rounded shadow border border-white max-w-lg w-full">
        <DatePicker
          selected={reservation.date}
          onChange={handleDateChange}
          minDate={new Date()}
          dayClassName={getDayClassName}
          filterDate={(date) => !isDayDisabled(date)}
          inline
          className="mb-4 text-black react-datepicker"
        />
        {errors.date && <div className="text-red-500 text-sm mb-2">{errors.date}</div>}
        <div className="flex justify-center my-4">
          {availableTimes.map((time) => (
            <div key={time} className="flex flex-col items-center">
              <button
                className={`px-5 py-3 rounded mx-2 ${selectedTime === time ? 'bg-white text-black border-black' : 'bg-black hover:bg-gray-800 text-white border-white'} border ${seatAvailability[time] === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleTimeSelection(time)}
                disabled={seatAvailability[time] === 0}
              >
                {time}
              </button>
              {showAvailability === time && (
                <div className="text-white mt-2">
                  {seatAvailability[time] !== undefined ? `${seatAvailability[time]} seats available` : '8 seats available'}
                </div>
              )}
            </div>
          ))}
        </div>
        {fullyBooked && <div className="text-red-500 text-sm mb-2">All time slots are fully booked for this date. Please select another date.</div>}
        {errors.time && <div className="text-red-500 text-sm mb-2">{errors.time}</div>}
        <div className="flex items-center justify-center my-4">
          <button
            className="bg-black text-white border border-white rounded px-5 py-3 mx-2 hover:bg-gray-800"
            onClick={() => handleGuestChange(reservation.guests - 1)}
            disabled={reservation.guests <= 1}
          >
            -
          </button>
          <span className="text-2xl mx-4">
            {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
          </span>
          <button
            className="bg-black text-white border border-white rounded px-5 py-3 mx-2 hover:bg-gray-800"
            onClick={() => handleGuestChange(reservation.guests + 1)}
            disabled={reservation.guests >= maxGuests}
          >
            +
          </button>
        </div>
        {errors.guests && <div className="text-red-500 text-sm mb-2">{errors.guests}</div>}
        <textarea
          className="w-full p-2 mt-4 text-black"
          placeholder="Add a note (e.g., Birthday celebration, Food allergies)"
          value={reservation.note}
          onChange={handleNoteChange}
        ></textarea>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            className="bg-black text-white border border-white hover:bg-gray-800 font-bold py-3 px-6 rounded"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            className="bg-black text-white border border-white hover:bg-gray-800 font-bold py-3 px-6 rounded"
            onClick={handleSubmit}
            disabled={fullyBooked}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeDateSelectionForm;






























































