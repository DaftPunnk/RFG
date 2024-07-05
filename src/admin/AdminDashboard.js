// src/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchReservations, updateReservation, cancelReservation } from './api';
import './AdminDashboard.css'; // Import CSS file for styling

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ time: '', guests: '', mealType: '' });

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
    setEditForm({ time: reservation.time, guests: reservation.guests, mealType: reservation.meal_type });
  };

  const handleSave = async () => {
    try {
      const updated = await updateReservation(editing, editForm);
      setReservations(reservations.map(reservation => 
        reservation.id === updated.id ? updated : reservation
      ));
      setEditing(null);
    } catch (error) {
      console.error('Failed to update reservation:', error);
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

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="reservations-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="reservation-item">
            {editing === reservation.id ? (
              <div className="edit-form">
                <select name="time" value={editForm.time} onChange={handleTimeChange} className="select-input">
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
                <input
                  type="number"
                  name="guests"
                  value={editForm.guests}
                  onChange={handleChange}
                  className="number-input"
                />
                <p>Meal Type: {editForm.mealType}</p>
                <button onClick={handleSave} className="save-button">Save</button>
                <button onClick={() => setEditing(null)} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <div className="reservation-details">
                <p><strong>Name:</strong> {reservation.name}</p>
                <p><strong>Time:</strong> {reservation.time}</p>
                <p><strong>People:</strong> {reservation.guests}</p>
                <p><strong>Meal Type:</strong> {reservation.meal_type}</p>
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







