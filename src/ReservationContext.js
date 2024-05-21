import React, { createContext, useContext, useState, useCallback } from 'react';

const ReservationContext = createContext();

export const useReservation = () => {
  return useContext(ReservationContext);
};

export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState({
    mealType: '',
    date: null,
    time: '',
    guests: 1,
    name: '',
    phone: '',
    email: ''
  });

  const updateReservation = useCallback((newReservation) => {
    setReservation(newReservation);
  }, []);

  return (
    <ReservationContext.Provider value={{ reservation, updateReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

