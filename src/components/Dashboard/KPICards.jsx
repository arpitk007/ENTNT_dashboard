// src/components/Dashboard/KPICards.jsx
import { useEquipment } from '../../contexts/EquipmentContext';
import { useRentals } from '../../contexts/RentalsContext';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import '../../styles/main.css';

const KPICards = () => {
  const { equipment } = useEquipment();
  const { rentals } = useRentals();
  const { maintenance } = useMaintenance();
  const today = new Date().toISOString().split('T')[0];

  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(e => e.status === 'Available').length;
  const rentedEquipment = equipment.filter(e => e.status === 'Rented').length;
  const overdueRentals = rentals.filter(r => r.endDate < today && r.status !== 'Returned').length;
  const upcomingMaintenance = maintenance.filter(m => m.date > today).length;

  return (
    <div className="kpi-cards">
      <div className="kpi-card">
        <h3>Total Equipment</h3>
        <p>{totalEquipment}</p>
      </div>
      <div className="kpi-card">
        <h3>Available Equipment</h3>
        <p>{availableEquipment}</p>
      </div>
      <div className="kpi-card">
        <h3>Rented Equipment</h3>
        <p>{rentedEquipment}</p>
      </div>
      <div className="kpi-card">
        <h3>Overdue Rentals</h3>
        <p>{overdueRentals}</p>
      </div>
      <div className="kpi-card">
        <h3>Upcoming Maintenance</h3>
        <p>{upcomingMaintenance}</p>
      </div>
    </div>
  );
};

export default KPICards;