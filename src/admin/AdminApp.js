import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import PrivateRoute from './PrivateRoute';

function AdminApp() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
    </Routes>
  );
}

export default AdminApp;














