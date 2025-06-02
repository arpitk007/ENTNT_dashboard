// src/components/Rentals/RentalForm.jsx
import { useState } from 'react';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { getData } from '../../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const RentalForm = () => {
  const { addRental } = useRentals();
  const { equipment } = useEquipment();
  const users = getData('users').filter(u => u.role === 'Customer');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    equipmentId: '',
    customerId: '',
    startDate: '',
    endDate: '',
    status: 'Reserved',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addRental(formData);
    navigate('/rentals');
  };

  return (
    <div className="rental-form">
      <h2>Create Rental</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Equipment:</label>
          <select
            value={formData.equipmentId}
            onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
            required
          >
            <option value="">Select Equipment</option>
            {equipment.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Customer:</label>
          <select
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            required
          >
            <option value="">Select Customer</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.email}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Reserved">Reserved</option>
            <option value="Rented">Rented</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/rentals')}>Cancel</button>
      </form>
    </div>
  );
};

export default RentalForm;