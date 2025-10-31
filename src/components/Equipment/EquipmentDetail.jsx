// src/components/Equipment/EquipmentDetail.jsx
import { useParams } from 'react-router-dom';
import { useEquipment } from '../../contexts/EquipmentContext';
import { getData } from '../../utils/localStorageUtils';
// import '../../styles/main.css';

const EquipmentDetail = () => {
  const { id } = useParams();
  const { equipment } = useEquipment();
  const rentals = getData('rentals').filter(r => r.equipmentId === id);
  const item = equipment.find(item => item.id === id);

  if (!item) return <p>Equipment not found</p>;

  return (
    <div className="equipment-detail">
      <h2>{item.name}</h2>
      <p>Category: {item.category}</p>
      <p>Condition: {item.condition}</p>
      <p>Status: {item.status}</p>
      <h3>Rental History</h3>
      <table>
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>Customer ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map(rental => (
            <tr key={rental.id}>
              <td>{rental.id}</td>
              <td>{rental.customerId}</td>
              <td>{rental.startDate}</td>
              <td>{rental.endDate}</td>
              <td>{rental.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentDetail;