import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';
import {
  Person,
  SupervisorAccount,
  AdminPanelSettings,
} from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();

  const loginOptions = [
    {
      title: 'Customer Login',
      icon: <Person sx={{ fontSize: 60 }} />,
      description: 'Access your rental orders and equipment details',
      role: 'customer',
      color: '#1976d2',
    },
    {
      title: 'Staff Login',
      icon: <SupervisorAccount sx={{ fontSize: 60 }} />,
      description: 'Manage rentals, equipment, and maintenance',
      role: 'staff',
      color: '#388e3c',
    },
    {
      title: 'Admin Login',
      icon: <AdminPanelSettings sx={{ fontSize: 60 }} />,
      description: 'Full system access and control',
      role: 'admin',
      color: '#d32f2f',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Welcome to ENTNT
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Equipment Rental Management System
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {loginOptions.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.role}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 4,
                  }}
                >
                  <Box sx={{ color: option.color, mb: 2 }}>
                    {option.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: 500 }}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {option.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(`/login/${option.role}`)}
                    sx={{
                      px: 4,
                      backgroundColor: option.color,
                      '&:hover': {
                        backgroundColor: option.color,
                        filter: 'brightness(0.9)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default LandingPage;