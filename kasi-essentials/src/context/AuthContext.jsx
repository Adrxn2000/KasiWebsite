import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage so session persists on refresh
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Derived — no separate isLoggedIn state needed
  const isLoggedIn = !!user;

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (userData) => {
    login(userData);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);