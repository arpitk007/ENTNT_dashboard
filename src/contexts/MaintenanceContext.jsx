// src/contexts/MaintenanceContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData, addNotification } from '../utils/localStorageUtils';

const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    setMaintenance(getData('maintenance'));
  }, []);

  const addMaintenance = (newMaintenance) => {
    const updatedMaintenance = [...maintenance, { id: `m${maintenance.length + 1}`, ...newMaintenance }];
    setMaintenance(updatedMaintenance);
    setData('maintenance', updatedMaintenance);
    addNotification(`Maintenance scheduled for equipment ID ${newMaintenance.equipmentId}`);
  };

  const updateMaintenance = (id, updatedMaintenance) => {
    const updatedList = maintenance.map(item => (item.id === id ? { ...item, ...updatedMaintenance } : item));
    setMaintenance(updatedList);
    setData('maintenance', updatedList);
  };

  return (
    <MaintenanceContext.Provider value={{ maintenance, addMaintenance, updateMaintenance }}>
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => useContext(MaintenanceContext);