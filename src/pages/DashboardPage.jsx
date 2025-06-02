import { useAuth } from '../contexts/AuthContext';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import { exportToCSV } from '../utils/localStorageUtils';
import '../styles/main.css';

const DashboardPage = () => {
  const { user } = useAuth();

  const handleExport = (type) => {
    exportToCSV(type);
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.email} ({user.role})</h1>
      <div className="export-reports">
        <h2>Export Reports</h2>
        <button onClick={() => handleExport('equipment')}>Export Equipment</button>
        <button onClick={() => handleExport('rentals')}>Export Rentals</button>
        <button onClick={() => handleExport('maintenance')}>Export Maintenance</button>
      </div>
      <KPICards />
      <Charts />
      <NotificationCenter />
    </div>
  );
};

export default DashboardPage;