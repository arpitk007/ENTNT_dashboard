// src/components/Equipment/EquipmentList.jsx
import { useEquipment } from '../../contexts/EquipmentContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const EquipmentList = () => {
  const { equipment, deleteEquipment } = useEquipment();
  const navigate = useNavigate();

  return (
    <div className="equipment-list">
      <h2>Equipment Inventory</h2>
      <button onClick={() => navigate('/equipment/add')}>Add Equipment</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Condition</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.condition}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => navigate(`/equipment/${item.id}`)}>View</button>
                <button onClick={() => navigate(`/equipment/edit/${item.id}`)}>Edit</button>
                <button onClick={() => deleteEquipment(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentList;