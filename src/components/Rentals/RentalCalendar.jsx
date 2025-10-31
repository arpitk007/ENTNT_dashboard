
import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  ButtonGroup,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { getData } from '../../utils/localStorageUtils';

const RentalCalendar = () => {
  const { rentals } = useRentals();
  const { equipment } = useEquipment();
  const users = getData('users');
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const getRentalsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return rentals.filter(
      (rental) => rental.startDate <= dateStr && rental.endDate >= dateStr
    );
  };

  const renderMonthView = () => {
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <Grid item xs={12 / 7} key={`empty-${i}`}>
          <Card 
            sx={{ 
              minHeight: 120, 
              backgroundColor: 'action.hover',
              opacity: 0.5,
            }} 
          />
        </Grid>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const rentalsForDay = getRentalsForDate(date);

      days.push(
        <Grid item xs={12 / 7} key={day}>
          <Card
            sx={{
              minHeight: 120,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { 
                transform: 'scale(1.02)', 
                boxShadow: 3,
                cursor: 'pointer',
              },
            }}
          >
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography 
                variant="body2" 
                fontWeight="bold" 
                gutterBottom
                sx={{ mb: 1 }}
              >
                {day}
              </Typography>
              {rentalsForDay.slice(0, 2).map((rental) => (
                <Chip
                  key={rental.id}
                  label={
                    equipment.find((e) => e.id === rental.equipmentId)?.name || 'Unknown'
                  }
                  size="small"
                  color="primary"
                  sx={{ 
                    fontSize: '0.7rem', 
                    height: 20, 
                    mb: 0.5, 
                    width: '100%',
                    '& .MuiChip-label': {
                      px: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  }}
                />
              ))}
              {rentalsForDay.length > 2 && (
                <Typography variant="caption" color="text.secondary">
                  +{rentalsForDay.length - 2} more
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      );
    }

    return days;
  };

  const renderWeekView = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const rentalsForDay = getRentalsForDate(date);

      days.push(
        <Grid item xs={12 / 7} key={i}>
          <Card 
            sx={{ 
              minHeight: 200,
              '&:hover': { 
                boxShadow: 3,
              },
            }}
          >
            <CardContent sx={{ p: 1.5 }}>
              <Typography 
                variant="body2" 
                fontWeight="bold" 
                gutterBottom
                color="primary"
              >
                {date.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Typography>
              {rentalsForDay.map((rental) => (
                <Box key={rental.id} sx={{ mb: 1 }}>
                  <Chip
                    label={equipment.find((e) => e.id === rental.equipmentId)?.name}
                    size="small"
                    color="primary"
                    sx={{ 
                      fontSize: '0.7rem', 
                      mb: 0.5, 
                      width: '100%',
                      height: 'auto',
                      minHeight: 24,
                      '& .MuiChip-label': {
                        whiteSpace: 'normal',
                        padding: '4px 8px',
                      },
                    }}
                  />
                  <Typography variant="caption" display="block" color="text.secondary">
                    {users.find((u) => u.id === rental.customerId)?.email || 'Unknown'}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      );
    }

    return days;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Rental Calendar
        </Typography>
        <ButtonGroup variant="outlined" size="large">
          <Button
            variant={view === 'month' ? 'contained' : 'outlined'}
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'contained' : 'outlined'}
            onClick={() => setView('week')}
          >
            Week
          </Button>
        </ButtonGroup>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}
        >
          {currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Typography>

        {view === 'month' && (
          <>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Grid item xs={12 / 7} key={day}>
                  <Box
                    sx={{
                      backgroundColor: 'action.hover',
                      py: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      align="center"
                    >
                      {day}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={1}>
              {renderMonthView()}
            </Grid>
          </>
        )}

        {view === 'week' && (
          <Grid container spacing={2}>
            {renderWeekView()}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default RentalCalendar;