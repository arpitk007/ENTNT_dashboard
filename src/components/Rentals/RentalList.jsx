import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Chip,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useAuth } from '../../contexts/AuthContext';
import { getData } from '../../utils/localStorageUtils';
import { canAccess } from '../../utils/roleUtils';

const RentalList = () => {
  const { rentals, updateRental } = useRentals();
  const { equipment } = useEquipment();
  const { user } = useAuth();
  const users = getData('users');
  const [filters, setFilters] = useState({
    status: '',
    customerId: '',
    equipmentId: '',
  });
  const navigate = useNavigate();

  const filteredRentals = rentals.filter((rental) => {
    return (
      (!filters.status || rental.status === filters.status) &&
      (!filters.customerId || rental.customerId === filters.customerId) &&
      (!filters.equipmentId || rental.equipmentId === filters.equipmentId)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reserved':
        return 'info';
      case 'Rented':
        return 'warning';
      case 'Returned':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Rental Orders
        </Typography>
        {canAccess(user, 'rentals_create') && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/rentals/add')}
          >
            Create Rental
          </Button>
        )}
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Filters
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Reserved">Reserved</MenuItem>
              <MenuItem value="Rented">Rented</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Customer</InputLabel>
            <Select
              value={filters.customerId}
              label="Customer"
              onChange={(e) =>
                setFilters({ ...filters, customerId: e.target.value })
              }
            >
              <MenuItem value="">All Customers</MenuItem>
              {users
                .filter((u) => u.role === 'Customer')
                .map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.email}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Equipment</InputLabel>
            <Select
              value={filters.equipmentId}
              label="Equipment"
              onChange={(e) =>
                setFilters({ ...filters, equipmentId: e.target.value })
              }
            >
              <MenuItem value="">All Equipment</MenuItem>
              {equipment.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 600 }}>Rental ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Equipment</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRentals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    No rentals found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredRentals.map((rental) => (
                <TableRow
                  key={rental.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{rental.id}</TableCell>
                  <TableCell>
                    {equipment.find((e) => e.id === rental.equipmentId)?.name}
                  </TableCell>
                  <TableCell>
                    {users.find((u) => u.id === rental.customerId)?.email}
                  </TableCell>
                  <TableCell>{rental.startDate}</TableCell>
                  <TableCell>{rental.endDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={rental.status}
                      color={getStatusColor(rental.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {canAccess(user, 'rentals_update') ? (
                      <Select
                        value={rental.status}
                        onChange={(e) =>
                          updateRental(rental.id, { status: e.target.value })
                        }
                        size="small"
                      >
                        <MenuItem value="Reserved">Reserved</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
                        <MenuItem value="Returned">Returned</MenuItem>
                      </Select>
                    ) : (
                      <Chip
                        label={rental.status}
                        color={getStatusColor(rental.status)}
                        size="small"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RentalList;