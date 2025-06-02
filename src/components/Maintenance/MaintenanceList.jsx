// src/components/Maintenance/MaintenanceList.jsx
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { canAccess } from '../../utils/roleUtils';
import '../../styles/main.css';

const MaintenanceList = () => {
  const { maintenance } = useMaintenance();
  const { equipment } = useEquipment();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="maintenance-list">
      <h2>Maintenance Records</h2>
      {canAccess(user, 'maintenance_add') && (
        <button onClick={() => navigate('/maintenance/add')}>Add Maintenance</button>
      )}
      <table>
        <thead>
          <tr>
            <th>Equipment</th>
            <th>Date</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintenance.map(record => (
            <tr key={record.id}>
              <td>{equipment.find(e => e.id === record.equipmentId)?.name}</td>
              <td>{record.date}</td>
              <td>{record.type}</td>
              <td>{record.notes}</td>
              <td>
                {canAccess(user, 'maintenance_edit') && (
                  <button onClick={() => navigate(`/maintenance/edit/${record.id}`)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceList;