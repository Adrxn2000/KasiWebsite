import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    // In a real application, you would handle API calls for login here
    console.log('User logged in:', userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // In a real application, you would handle API calls for logout here
    console.log('User logged out');
  };

  const register = (userData) => {
    // In a real application, you would handle API calls for registration here
    console.log('User registered:', userData);
    // For simplicity, auto-login after registration
    login(userData);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
