import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Alert,
  Link,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Login } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 1,
          }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body1"
          sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
        >
          Email:
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          autoFocus
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
              '& fieldset': {
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '12px 14px',
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body1"
          sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
        >
          Password:
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
              '& fieldset': {
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '12px 14px',
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              size="small"
              sx={{
                color: 'text.secondary',
                '&.Mui-checked': {
                  color: 'primary.main',
                },
              }}
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              Show Password
            </Typography>
          }
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        startIcon={<Login />}
        sx={{
          py: 1.5,
          textTransform: 'uppercase',
          fontSize: '0.95rem',
          fontWeight: 600,
          letterSpacing: 0.5,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        Sign In
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Demo Credentials
        </Typography>
      </Divider>

      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f8f9fa',
          p: 2,
          borderRadius: 1,
          mb: 2,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e0e0e0',
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mb: 0.5 }}
        >
          <strong>Admin:</strong> admin@entnt.in / admin123
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mb: 0.5 }}
        >
          <strong>Staff:</strong> staff@entnt.in / staff123
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          <strong>Customer:</strong> customer@entnt.in / cust123
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Link
          component="button"
          variant="body2"
          type="button"
          onClick={() => navigate('/')}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          ← Back to role selection
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;