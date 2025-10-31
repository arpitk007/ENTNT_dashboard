import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Alert,
  Stack,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { useEquipment } from '../../contexts/EquipmentContext';

const EquipmentForm = () => {
  const { equipment, addEquipment, updateEquipment } = useEquipment();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: 'Good',
    status: 'Available',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const item = equipment.find((item) => item.id === id);
      if (item) setFormData(item);
    }
  }, [id, equipment, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim()) {
      setError('Name and Category are required');
      return;
    }
    if (isEdit) {
      updateEquipment(id, formData);
    } else {
      addEquipment(formData);
    }
    navigate('/equipment');
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {isEdit ? 'Edit Equipment' : 'Add Equipment'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Equipment Name"
            value={formData.name}
            onChange={handleChange('name')}
            required
            margin="normal"
            placeholder="Enter equipment name"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Category"
            value={formData.category}
            onChange={handleChange('category')}
            required
            margin="normal"
            placeholder="Enter category"
            variant="outlined"
          />

          <TextField
            fullWidth
            select
            label="Condition"
            value={formData.condition}
            onChange={handleChange('condition')}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Fair">Fair</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Status"
            value={formData.status}
            onChange={handleChange('status')}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Rented">Rented</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
          </TextField>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<Save />}
              fullWidth
            >
              Save
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Cancel />}
              onClick={() => navigate('/equipment')}
              fullWidth
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default EquipmentForm;