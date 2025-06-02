// src/components/Rentals/RentalCalendar.jsx
import { useState } from 'react';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { getData } from '../../utils/localStorageUtils';
import '../../styles/main.css';

const RentalCalendar = () => {
  const { rentals } = useRentals();
  const { equipment } = useEquipment();
  const users = getData('users');
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const getRentalsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return rentals.filter(rental => rental.startDate <= dateStr && rental.endDate >= dateStr);
  };

  const renderMonthView = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const rentalsForDay = getRentalsForDate(date);
      days.push(
        <div key={day} className="calendar-day">
          <span>{day}</span>
          {rentalsForDay.map(rental => (
            <div key={rental.id} className="rental-event">
              {equipment.find(e => e.id === rental.equipmentId)?.name} -{' '}
              {users.find(u => u.id === rental.customerId)?.email}
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  const renderWeekView = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const rentalsForDay = getRentalsForDate(date);
      days.push(
        <div key={i} className="calendar-day">
          <span>{date.getDate()}</span>
          {rentalsForDay.map(rental => (
            <div key={rental.id} className="rental-event">
              {equipment.find(e => e.id === rental.equipmentId)?.name} -{' '}
              {users.find(u => u.id === rental.customerId)?.email}
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="rental-calendar">
      <h2>Rental Calendar</h2>
      <div>
        <button onClick={() => setView('month')}>Month</button>
        <button onClick={() => setView('week')}>Week</button>
      </div>
      <div className="calendar">
        {view === 'month' && (
          <>
            <div className="calendar-header">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="calendar-body">{renderMonthView()}</div>
          </>
        )}
        {view === 'week' && (
          <>
            <div className="calendar-header">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="calendar-body">{renderWeekView()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default RentalCalendar;