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
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import {
  Add,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';
import { useEquipment } from '../../contexts/EquipmentContext';

const EquipmentList = () => {
  const { equipment, deleteEquipment } = useEquipment();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'Rented':
        return 'warning';
      case 'Maintenance':
        return 'error';
      default:
        return 'default';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent':
        return 'success';
      case 'Good':
        return 'primary';
      case 'Fair':
        return 'warning';
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
          Equipment Inventory
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/equipment/add')}
        >
          Add Equipment
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Condition</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipment.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    No equipment found. Add your first equipment item.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              equipment.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.condition}
                      color={getConditionColor(item.condition)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/equipment/${item.id}`)}
                        title="View"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => navigate(`/equipment/edit/${item.id}`)}
                        title="Edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this equipment?'
                            )
                          ) {
                            deleteEquipment(item.id);
                          }
                        }}
                        title="Delete"
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
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

export default EquipmentList;