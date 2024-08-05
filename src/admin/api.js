// src/admin/api.js
export const fetchReservations = async () => {
  const response = await fetch('http://localhost:3001/api/reservations'); // Ensure the correct backend URL
  if (!response.ok) {
    throw new Error('Failed to fetch reservations');
  }
  return await response.json();
};

export const updateReservation = async (id, updates) => {
  const response = await fetch(`http://localhost:3001/api/reservations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update reservation');
  }
  return await response.json();
};

export const cancelReservation = async (id) => {
  const response = await fetch(`http://localhost:3001/api/reservations/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to cancel reservation');
  }
  return await response.json();
};

  
  
  