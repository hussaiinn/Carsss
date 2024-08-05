// src/components/NavigationGuard.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const NavigationGuard = ({ children, allowedPaths }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if the current path is in the allowed paths
  const isAllowed = allowedPaths.includes(currentPath);

  // If not allowed and current path is not the home page, redirect to home
  if (!isAllowed && currentPath !== '/') {
    return <Navigate to="/" />;
  }

  return children;
};

export default NavigationGuard;
