import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to ENTNT Rental Management</h1>
      <p>Choose your login type to access the dashboard.</p>
      <div className="login-options">
        <button onClick={() => navigate('/login/customer')}>
Customer Login</button>
        <button onClick={() => navigate('/login/staff')}>
Staff Login</button>
        <button onClick={() => navigate('/login/admin')}>
Admin Login</button>
      </div>
    </div>
  );
};

export default LandingPage;