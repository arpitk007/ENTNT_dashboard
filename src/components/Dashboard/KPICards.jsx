import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  Construction,
  CheckCircle,
  EventAvailable,
  Warning,
  Build,
} from '@mui/icons-material';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useRentals } from '../../contexts/RentalsContext';
import { useMaintenance } from '../../contexts/MaintenanceContext';

const KPICards = () => {
  const { equipment } = useEquipment();
  const { rentals } = useRentals();
  const { maintenance } = useMaintenance();
  const today = new Date().toISOString().split('T')[0];

  const kpiData = [
    {
      title: 'Total Equipment',
      value: equipment.length,
      icon: <Construction sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      bgColor: 'rgba(25, 118, 210, 0.1)',
    },
    {
      title: 'Available Equipment',
      value: equipment.filter((e) => e.status === 'Available').length,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      bgColor: 'rgba(46, 125, 50, 0.1)',
    },
    {
      title: 'Rented Equipment',
      value: equipment.filter((e) => e.status === 'Rented').length,
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      bgColor: 'rgba(237, 108, 2, 0.1)',
    },
    {
      title: 'Overdue Rentals',
      value: rentals.filter(
        (r) => r.endDate < today && r.status !== 'Returned'
      ).length,
      icon: <Warning sx={{ fontSize: 40 }} />,
      color: '#d32f2f',
      bgColor: 'rgba(211, 47, 47, 0.1)',
    },
    {
      title: 'Upcoming Maintenance',
      value: maintenance.filter((m) => m.date > today).length,
      icon: <Build sx={{ fontSize: 40 }} />,
      color: '#7b1fa2',
      bgColor: 'rgba(123, 31, 162, 0.1)',
    },
  ];

  return (
    <Grid container spacing={3}>
      {kpiData.map((kpi) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={kpi.title}>
          <Card
            elevation={2}
            sx={{
              height: '100%',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: kpi.bgColor,
                    color: kpi.color,
                    borderRadius: 2,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {kpi.icon}
                </Box>
              </Box>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: 700, color: kpi.color, mb: 1 }}
              >
                {kpi.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {kpi.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPICards;