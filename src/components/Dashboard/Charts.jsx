import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from 'chart.js';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useRentals } from '../../contexts/RentalsContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

const Charts = () => {
  const { equipment } = useEquipment();
  const { rentals } = useRentals();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const textColor = theme.palette.text.primary;
  const borderColor = theme.palette.divider;

  const pieColors = {
    light: ['#36A2EB', '#FF6384', '#FFCE56'],
    dark: ['#4BC0C0', '#FF9F40', '#FFCD56'],
  };

  const lineColors = {
    light: {
      border: '#36A2EB',
      background: 'rgba(54, 162, 235, 0.2)',
      point: '#36A2EB',
    },
    dark: {
      border: '#4BC0C0',
      background: 'rgba(75, 192, 192, 0.2)',
      point: '#4BC0C0',
    },
  };

  const available = equipment.filter((e) => e.status === 'Available').length;
  const rented = equipment.filter((e) => e.status === 'Rented').length;
  const maintenance = equipment.filter((e) => e.status === 'Maintenance').length;

  const pieData = {
    labels: ['Available', 'Rented', 'Maintenance'],
    datasets: [
      {
        data: [available, rented, maintenance],
        backgroundColor: isDark ? pieColors.dark : pieColors.light,
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: textColor, padding: 15 },
      },
      tooltip: {
        backgroundColor: isDark ? '#333' : '#fff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    },
  };

  const getRentalActivity = () => {
    const months = ['May 2025', 'June 2025', 'July 2025'];
    const counts = months.map((month) => {
      const [m, y] = month.split(' ');
      const monthIndex = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ].indexOf(m);
      return rentals.filter((r) => {
        const start = new Date(r.startDate);
        return (
          start.getFullYear() === parseInt(y) &&
          start.getMonth() === monthIndex
        );
      }).length;
    });
    return { months, counts };
  };

  const { months, counts } = getRentalActivity();
  const currentColors = isDark ? lineColors.dark : lineColors.light;

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Rentals Started',
        data: counts,
        borderColor: currentColors.border,
        backgroundColor: currentColors.background,
        pointBackgroundColor: currentColors.point,
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: textColor, padding: 15 },
      },
      tooltip: {
        backgroundColor: isDark ? '#333' : '#fff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: textColor },
        grid: { color: borderColor },
      },
      x: {
        ticks: { color: textColor },
        grid: { color: borderColor },
      },
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Equipment Status Distribution
          </Typography>
          <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
            {available + rented + maintenance === 0 ? (
              <Typography color="text.secondary">
                No equipment data available to display the chart.
              </Typography>
            ) : (
              <Pie data={pieData} options={pieOptions} />
            )}
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Rental Activity Over Time
          </Typography>
          <Box sx={{ height: 300 }}>
            {counts.every((count) => count === 0) ? (
              <Typography color="text.secondary">
                No rental data available to display the chart.
              </Typography>
            ) : (
              <Line data={lineData} options={lineOptions} />
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Charts;