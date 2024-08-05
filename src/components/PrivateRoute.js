// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles, userRole }) => {
  const location = useLocation();

  // Check if the user role is in the list of allowed roles
  if (!allowedRoles.includes(userRole)) {
    // Redirect them to the home page or login page if not authorized
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
