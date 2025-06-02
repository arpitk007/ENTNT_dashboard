// src/components/Maintenance/MaintenanceForm.jsx
import { useState, useEffect } from 'react';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/main.css';

const MaintenanceForm = () => {
  const { maintenance, addMaintenance, updateMaintenance } = useMaintenance();
  const { equipment } = useEquipment();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    equipmentId: '',
    date: '',
    type: '',
    notes: '',
  });

  useEffect(() => {
    if (isEdit) {
      const record = maintenance.find(item => item.id === id);
      if (record) setFormData(record);
    }
  }, [id, maintenance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateMaintenance(id, formData);
    } else {
      addMaintenance(formData);
    }
    navigate('/maintenance');
  };

  return (
    <div className="maintenance-form">
      <h2>{isEdit ? 'Edit Maintenance' : 'Add Maintenance'}</h2>
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
          <label>Date:</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/maintenance')}>Cancel</button>
      </form>
    </div>
  );
};

export default MaintenanceForm;