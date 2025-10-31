// src/components/Rentals/RentalForm.jsx
import { useState } from 'react';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { getData } from '../../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select, Paper } from '@mui/material';
// import '../../styles/main.css';

const RentalForm = () => {
  const { addRental } = useRentals();
  const { equipment } = useEquipment();
  const users = (getData('users') || []).filter(u => u.role === 'Customer');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    equipmentId: '',
    customerId: '',
    startDate: '',
    endDate: '',
    status: 'Reserved',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addRental(formData);
    navigate('/rentals');
  };

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 3, width: '100%', maxWidth: 600 }} elevation={3}>
        <h2>Create Rental</h2>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal">
          <InputLabel id="equipment-label">Equipment</InputLabel>
          <Select
            labelId="equipment-label"
            label="Equipment"
            value={formData.equipmentId}
            onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
            required
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {equipment.map(e => (
              <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="customer-label">Customer</InputLabel>
          <Select
            labelId="customer-label"
            label="Customer"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            required
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {users.map(u => (
              <MenuItem key={u.id} value={u.id}>{u.email}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <MenuItem value="Reserved">Reserved</MenuItem>
            <MenuItem value="Rented">Rented</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
          </Select>
        </FormControl>

          <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="outlined" onClick={() => navigate('/rentals')}>Cancel</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RentalForm;