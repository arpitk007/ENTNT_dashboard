import { useState } from 'react';
import { Box, Container, ButtonGroup, Button } from '@mui/material';
import { ViewList, CalendarMonth } from '@mui/icons-material';
import RentalList from '../components/Rentals/RentalList';
import RentalCalendar from '../components/Rentals/RentalCalendar';

const RentalsPage = () => {
  const [view, setView] = useState('list');

  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ButtonGroup variant="outlined" size="large">
            <Button
              variant={view === 'list' ? 'contained' : 'outlined'}
              startIcon={<ViewList />}
              onClick={() => setView('list')}
            >
              List View
            </Button>
            <Button
              variant={view === 'calendar' ? 'contained' : 'outlined'}
              startIcon={<CalendarMonth />}
              onClick={() => setView('calendar')}
            >
              Calendar View
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
      {view === 'list' ? <RentalList /> : <RentalCalendar />}
    </Box>
  );
};

export default RentalsPage;