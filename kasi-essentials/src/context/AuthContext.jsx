import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    
    console.log('User logged in:', userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    console.log('User logged out');
  };

  const register = (userData) => {

    console.log('User registered:', userData);

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
