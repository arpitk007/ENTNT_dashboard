// src/pages/RentalsPage.jsx
import { useState } from 'react';
import RentalList from '../components/Rentals/RentalList';
import RentalCalendar from '../components/Rentals/RentalCalendar';

const RentalsPage = () => {
  const [view, setView] = useState('list');

  return (
    <div>
      <button onClick={() => setView('list')}>List View</button>
      <button onClick={() => setView('calendar')}>Calendar View</button>
      {view === 'list' ? <RentalList /> : <RentalCalendar />}
    </div>
  );
};

export default RentalsPage;