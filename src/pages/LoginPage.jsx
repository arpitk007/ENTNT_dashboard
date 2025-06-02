import { useParams } from 'react-router-dom';
import LoginForm from '../components/Authentication/LoginForm';
import '../styles/main.css';

const LoginPage = () => {
  const { role } = useParams();
  const roleTitle = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  return (
    <div className="login-page">
      <h1>{roleTitle} Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;