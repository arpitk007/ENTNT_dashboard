// src/contexts/RentalsContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData, addNotification } from '../utils/localStorageUtils';

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    setRentals(getData('rentals'));
  }, []);

  const addRental = (newRental) => {
    const updatedRentals = [...rentals, { id: `r${rentals.length + 1}`, ...newRental }];
    setRentals(updatedRentals);
    setData('rentals', updatedRentals);
    addNotification(`New rental created for equipment ID ${newRental.equipmentId}`);
  };

  const updateRental = (id, updatedRental) => {
    const updatedList = rentals.map(item => (item.id === id ? { ...item, ...updatedRental } : item));
    setRentals(updatedList);
    setData('rentals', updatedList);
    if (updatedRental.status === 'Returned') {
      addNotification(`Rental ${id} marked as Returned`);
    }
  };

  return (
    <RentalsContext.Provider value={{ rentals, addRental, updateRental }}>
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentals = () => useContext(RentalsContext);