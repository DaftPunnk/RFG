// src/ReservationContext.js

import React, { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

export const useReservation = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
    const [reservation, setReservation] = useState({
        mealType: '',
        date: new Date(),
        time: '',
        guests: 1,
        name: '',
        phone: '',
        email: '',
    });

    const updateReservation = (newData) => {
        setReservation((prev) => ({ ...prev, ...newData }));
    };

    return (
        <ReservationContext.Provider value={{ reservation, updateReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};
