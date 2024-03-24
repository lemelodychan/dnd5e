import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = (password) => {
    if (password === 'catharsis') {
      setAuthenticated(true);
      localStorage.setItem('authenticated', 'true');
      window.location.reload();
    } else {
      alert('Incorrect password');
    }
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('Auth Context:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

