// admin/AdminApp.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute'; // You'll create this for protected routes

const AdminApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/login" component={AdminLogin} />
        <PrivateRoute path="/admin/dashboard" component={Dashboard} />
        {/* More admin routes as needed */}
      </Switch>
    </Router>
  );
}

export default AdminApp;
