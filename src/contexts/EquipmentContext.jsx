// src/contexts/EquipmentContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData } from '../utils/localStorageUtils';

const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    setEquipment(getData('equipment'));
  }, []);

  const addEquipment = (newEquipment) => {
    const updatedEquipment = [...equipment, { id: `eq${equipment.length + 1}`, ...newEquipment }];
    setEquipment(updatedEquipment);
    setData('equipment', updatedEquipment);
  };

  const updateEquipment = (id, updatedEquipment) => {
    const updatedList = equipment.map(item => (item.id === id ? { ...item, ...updatedEquipment } : item));
    setEquipment(updatedList);
    setData('equipment', updatedList);
  };

  const deleteEquipment = (id) => {
    const updatedList = equipment.filter(item => item.id !== id);
    setEquipment(updatedList);
    setData('equipment', updatedList);
  };

  return (
    <EquipmentContext.Provider value={{ equipment, addEquipment, updateEquipment, deleteEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => useContext(EquipmentContext);