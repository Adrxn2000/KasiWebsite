import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoggedIn, loading } = useAuth(); // Add a loading state if possible
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we AREN'T loading and the user is invalid
    if (!loading && (!isLoggedIn || (requiredRole && user?.role !== requiredRole))) {
      navigate('/login');
    }
  }, [isLoggedIn, user, requiredRole, navigate, loading]);

  if (loading) return <div>Loading...</div>; // Or a spinner
  
  if (!isLoggedIn || (requiredRole && user?.role !== requiredRole)) {
    return null; 
  }

  return children;
};


export default ProtectedRoute;
