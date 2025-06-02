// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getData } from '../utils/localStorageUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const users = getData('users');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('authUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };
// src/contexts/AuthContext.jsx
const logout = () => {
  setUser(null);
  localStorage.removeItem('authUser');
  window.location.href = '/'; // Redirect to landing page
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);