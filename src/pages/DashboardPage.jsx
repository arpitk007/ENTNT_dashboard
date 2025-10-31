import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import { exportToCSV } from '../utils/localStorageUtils';

const DashboardPage = () => {
  const { user } = useAuth();

  const handleExport = (type) => {
    exportToCSV(type);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome, {user.email}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Role: {user.role}
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Export Reports
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => handleExport('equipment')}
          >
            Export Equipment
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => handleExport('rentals')}
          >
            Export Rentals
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => handleExport('maintenance')}
          >
            Export Maintenance
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <KPICards />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Charts />
      </Box>

      <Box>
        <NotificationCenter />
      </Box>
    </Container>
  );
};

export default DashboardPage;