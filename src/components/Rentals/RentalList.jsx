// src/components/Rentals/RentalList.jsx
import { useState } from 'react';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useAuth } from '../../contexts/AuthContext';
import { getData } from '../../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import { canAccess } from '../../utils/roleUtils';
import '../../styles/main.css';

const RentalList = () => {
  const { rentals, updateRental } = useRentals();
  const { equipment } = useEquipment();
  const { user } = useAuth();
  const users = getData('users');
  const [filters, setFilters] = useState({ status: '', customerId: '', equipmentId: '' });
  const navigate = useNavigate();

  const filteredRentals = rentals.filter(rental => {
    return (
      (!filters.status || rental.status === filters.status) &&
      (!filters.customerId || rental.customerId === filters.customerId) &&
      (!filters.equipmentId || rental.equipmentId === filters.equipmentId)
    );
  });

  return (
    <div className="rental-list">
      <h2>Rental Orders</h2>
      {canAccess(user, 'rentals_create') && (
        <button onClick={() => navigate('/rentals/add')}>Create Rental</button>
      )}
      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Reserved">Reserved</option>
          <option value="Rented">Rented</option>
          <option value="Returned">Returned</option>
        </select>
        <select
          value={filters.customerId}
          onChange={(e) => setFilters({ ...filters, customerId: e.target.value })}
        >
          <option value="">All Customers</option>
          {users.filter(u => u.role === 'Customer').map(u => (
            <option key={u.id} value={u.id}>{u.email}</option>
          ))}
        </select>
        <select
          value={filters.equipmentId}
          onChange={(e) => setFilters({ ...filters, equipmentId: e.target.value })}
        >
          <option value="">All Equipment</option>
          {equipment.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>Equipment</th>
            <th>Customer</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRentals.map(rental => (
            <tr key={rental.id}>
              <td>{rental.id}</td>
              <td>{equipment.find(e => e.id === rental.equipmentId)?.name}</td>
              <td>{users.find(u => u.id === rental.customerId)?.email}</td>
              <td>{rental.startDate}</td>
              <td>{rental.endDate}</td>
              <td>{rental.status}</td>
              <td>
                {canAccess(user, 'rentals_update') ? (
                  <select
                    value={rental.status}
                    onChange={(e) => updateRental(rental.id, { status: e.target.value })}
                  >
                    <option value="Reserved">Reserved</option>
                    <option value="Rented">Rented</option>
                    <option value="Returned">Returned</option>
                  </select>
                ) : (
                  <span>{rental.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalList;