import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || (requiredRole && user?.role !== requiredRole)) {
      navigate('/login');
    }
  }, [isLoggedIn, user, requiredRole, navigate]);

  if (!isLoggedIn || (requiredRole && user?.role !== requiredRole)) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
