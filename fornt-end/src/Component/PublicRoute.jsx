// src/components/PublicRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;
