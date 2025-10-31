// src/components/Maintenance/MaintenanceForm.jsx
import { useState, useEffect } from 'react';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select, Paper } from '@mui/material';

const MaintenanceForm = () => {
  const { maintenance, addMaintenance, updateMaintenance } = useMaintenance();
  const { equipment } = useEquipment();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    equipmentId: '',
    date: '',
    type: '',
    notes: '',
  });

  useEffect(() => {
    if (isEdit) {
      const record = maintenance.find(item => item.id === id);
      if (record) setFormData(record);
    }
  }, [id, maintenance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateMaintenance(id, formData);
    } else {
      addMaintenance(formData);
    }
    navigate('/maintenance');
  };

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 3, width: '100%', maxWidth: 600 }} elevation={3}>
        <h2>{isEdit ? 'Edit Maintenance' : 'Add Maintenance'}</h2>
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

        <TextField
          fullWidth
          margin="normal"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          multiline
          rows={4}
        />

          <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="outlined" onClick={() => navigate('/maintenance')}>Cancel</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MaintenanceForm;