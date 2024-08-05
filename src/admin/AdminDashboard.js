import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fetchReservations, updateReservation, cancelReservation } from './api';
import moment from 'moment';
import { useAuth } from '../AuthContext';
import './AdminDashboard.css'; // Import CSS file for styling

const AdminDashboard = () => {
  const { logout } = useAuth(); // Import logout from useAuth
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ date: new Date(), time: '', guests: '', mealType: '', name: '', phone: '', email: '', note: '' });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };
    getReservations();
  }, []);

  useEffect(() => {
    const validateForm = () => {
      const { date, time, guests, name, phone, email } = editForm;
      let newErrors = {};

      if (!date) newErrors.date = 'Date is required';
      if (!time) newErrors.time = 'Time is required';
      if (!guests || isNaN(guests) || guests <= 0) newErrors.guests = 'Valid number of guests is required';
      if (!name) newErrors.name = 'Name is required';
      if (!phone) newErrors.phone = 'Phone is required';
      if (!email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Valid email is required';

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [editForm]);

  const handleCancel = async (id) => {
    try {
      await cancelReservation(id);
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
    }
  };

  const handleEdit = (reservation) => {
    setEditing(reservation.id);
    setEditForm({
      date: new Date(reservation.date),
      time: reservation.time,
      guests: reservation.guests,
      mealType: reservation.meal_type,
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email,
      note: reservation.note // Add note here
    });
  };

  const handleSave = async () => {
    if (!isValid) return;
    try {
      const updated = await updateReservation(editing, {
        ...editForm,
        date: moment(editForm.date).format('YYYY-MM-DD')
      });
      setEditing(null);
      await getReservations(); // Refetch reservations after save
    } catch (error) {
      console.error('Failed to update reservation:', error);
    }
  };

  const getReservations = async () => {
    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    let mealType = '';
    if (time === '12:00' || time === '13:00') {
      mealType = 'lunch';
    } else if (time === '18:00' || time === '19:00') {
      mealType = 'dinner';
    }
    setEditForm({ ...editForm, time, mealType });
  };

  const handleDateChange = (date) => {
    setEditForm({ ...editForm, date });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={logout} className="logout-button">Logout</button> {/* Add logout button */}
      <div className="reservations-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="reservation-item">
            {editing === reservation.id ? (
              <div className="edit-form">
                <DatePicker
                  selected={editForm.date}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="date-picker"
                />
                {errors.date && <span className="error">{errors.date}</span>}
                <select name="time" value={editForm.time} onChange={handleTimeChange} className="select-input">
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
                {errors.time && <span className="error">{errors.time}</span>}
                <input
                  type="number"
                  name="guests"
                  value={editForm.guests}
                  onChange={handleChange}
                  className="number-input"
                />
                {errors.guests && <span className="error">{errors.guests}</span>}
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Phone"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <textarea
                  name="note"
                  value={editForm.note}
                  onChange={handleChange}
                  className="text-input"
                  placeholder="Note"
                />
                <p>Meal Type: {editForm.mealType}</p>
                <button onClick={handleSave} className="save-button" disabled={!isValid}>Save</button>
                <button onClick={() => setEditing(null)} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <div className="reservation-details">
                <p><strong>Date:</strong> {moment(reservation.date).format('YYYY-MM-DD')}</p>
                <p><strong>Name:</strong> {reservation.name}</p>
                <p><strong>Phone:</strong> {reservation.phone}</p>
                <p><strong>Email:</strong> {reservation.email}</p>
                <p><strong>Time:</strong> {reservation.time}</p>
                <p><strong>People:</strong> {reservation.guests}</p>
                <p><strong>Meal Type:</strong> {reservation.meal_type}</p>
                <p><strong>Note:</strong> {reservation.note}</p> {/* Add this line */}
                <button onClick={() => handleEdit(reservation)} className="edit-button">Edit</button>
                <button onClick={() => handleCancel(reservation.id)} className="cancel-button">Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

















