import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log('PrivateRoute authentication check:', isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;










