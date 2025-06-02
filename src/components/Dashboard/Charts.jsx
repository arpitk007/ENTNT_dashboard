
// src/components/Dashboard/Charts.jsx
import { useEquipment } from '../../contexts/EquipmentContext';
import { useRentals } from '../../contexts/RentalsContext';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import '../../styles/main.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler);

const Charts = () => {
  const { equipment } = useEquipment();
  const { rentals } = useRentals();

  // Get the current theme
  const currentTheme = document.body.getAttribute('data-theme') || 'light';

  // Define colors based on theme
  const textColor = getComputedStyle(document.body).getPropertyValue('--text').trim();
  const borderColor = getComputedStyle(document.body).getPropertyValue('--border').trim();

  // Theme-specific colors for charts
  const pieColors = {
    light: ['#36A2EB', '#FF6384', '#FFCE56'], // Colors for light mode
    dark: ['#4BC0C0', '#FF9F40', '#FFCD56'],  // Adjusted colors for dark mode (brighter, better contrast)
  };

  const lineColors = {
    light: {
      border: '#36A2EB',
      background: 'rgba(54, 162, 235, 0.2)',
      point: '#36A2EB',
    },
    dark: {
      border: '#4BC0C0',                     // Brighter cyan for better visibility
      background: 'rgba(75, 192, 192, 0.2)', // Adjusted background with better contrast
      point: '#4BC0C0',
    },
  };

  // Equipment Status Pie Chart Data
  const available = equipment.filter(e => e.status === 'Available').length;
  const rented = equipment.filter(e => e.status === 'Rented').length;
  const maintenance = equipment.filter(e => e.status === 'Maintenance').length;

  const pieData = {
    labels: ['Available', 'Rented', 'Maintenance'],
    datasets: [{
      data: [available, rented, maintenance],
      backgroundColor: pieColors[currentTheme],
      borderColor: '#ffffff',
      borderWidth: 1,
    }],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: textColor },
      },
      tooltip: {
        backgroundColor: currentTheme === 'dark' ? '#333' : '#fff',
        titleColor: textColor,
        bodyColor: textColor,
      },
    },
  };

  // Rental Activity Line Chart Data
  const getRentalActivity = () => {
    const months = ['May 2025', 'June 2025', 'July 2025'];
    const counts = months.map(month => {
      const [m, y] = month.split(' ');
      const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(m);
      return rentals.filter(r => {
        const start = new Date(r.startDate);
        return start.getFullYear() === parseInt(y) && start.getMonth() === monthIndex;
      }).length;
    });
    return { months, counts };
  };

  const { months, counts } = getRentalActivity();

  const lineData = {
    labels: months,
    datasets: [{
      label: 'Rentals Started',
      data: counts,
      borderColor: lineColors[currentTheme].border,
      backgroundColor: lineColors[currentTheme].background,
      pointBackgroundColor: lineColors[currentTheme].point,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      fill: true,
      tension: 0.4,
    }],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: textColor },
      },
      tooltip: {
        backgroundColor: currentTheme === 'dark' ? '#333' : '#fff',
        titleColor: textColor,
        bodyColor: textColor,
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
    <div className="charts">
      <h2>Equipment Status Distribution</h2>
      <div className="chart-container">
        {available + rented + maintenance === 0 ? (
          <p>No equipment data available to display the chart.</p>
        ) : (
          <Pie data={pieData} options={pieOptions} />
        )}
      </div>

      <h2>Rental Activity Over Time</h2>
      <div className="chart-container">
        {counts.every(count => count === 0) ? (
          <p>No rental data available to display the chart.</p>
        ) : (
          <Line data={lineData} options={lineOptions} />
        )}
      </div>
    </div>
  );
};

export default Charts;
