import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { canAccess } from '../utils/roleUtils';
import '../styles/main.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!user) return null;

  return (
    <header className="header">
      <h1>ENTNT Rental Dashboard</h1>
      <nav>
        {canAccess(user, 'equipment_add') && (
          <button onClick={() => navigate('/equipment')}>Equipment</button>
        )}
        {canAccess(user, 'rentals_create') && (
          <button onClick={() => navigate('/rentals')}>Rentals</button>
        )}
        {canAccess(user, 'maintenance_add') && (
          <button onClick={() => navigate('/maintenance')}>Maintenance</button>
        )}
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;