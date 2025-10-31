import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Paper, Avatar } from '@mui/material';
import {
  Person,
  SupervisorAccount,
  AdminPanelSettings,
} from '@mui/icons-material';
import LoginForm from '../components/Authentication/LoginForm';

const LoginPage = () => {
  const { role } = useParams();
  const roleTitle = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  const getRoleIcon = () => {
    switch (role) {
      case 'customer':
        return <Person sx={{ fontSize: 40 }} />;
      case 'staff':
        return <SupervisorAccount sx={{ fontSize: 40 }} />;
      case 'admin':
        return <AdminPanelSettings sx={{ fontSize: 40 }} />;
      default:
        return <Person sx={{ fontSize: 40 }} />;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'customer':
        return '#1976d2';
      case 'staff':
        return '#388e3c';
      case 'admin':
        return '#d32f2f';
      default:
        return '#1976d2';
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 3,
            width: '100%',
            maxWidth: 480,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                backgroundColor: getRoleColor(),
                mb: 2,
              }}
            >
              {getRoleIcon()}
            </Avatar>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 0.5,
              }}
            >
              Login
            </Typography>
          </Box>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;