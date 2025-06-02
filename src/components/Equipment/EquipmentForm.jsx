// src/components/Equipment/EquipmentForm.jsx
import { useState, useEffect } from 'react';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/main.css';

const EquipmentForm = () => {
  const { equipment, addEquipment, updateEquipment } = useEquipment();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: 'Good',
    status: 'Available',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const item = equipment.find(item => item.id === id);
      if (item) setFormData(item);
    }
  }, [id, equipment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim()) {
      setError('Name and Category are required');
      return;
    }
    if (isEdit) {
      updateEquipment(id, formData);
    } else {
      addEquipment(formData);
    }
    navigate('/equipment');
  };

  return (
    <div className="equipment-form">
      <h2>{isEdit ? 'Edit Equipment' : 'Add Equipment'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Condition:</label>
          <select
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
          >
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/equipment')}>Cancel</button>
      </form>
    </div>
  );
};

export default EquipmentForm;