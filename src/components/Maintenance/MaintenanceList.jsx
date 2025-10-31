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
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useAuth } from '../../contexts/AuthContext';
import { canAccess } from '../../utils/roleUtils';

const MaintenanceList = () => {
  const { maintenance } = useMaintenance();
  const { equipment } = useEquipment();
  const { user } = useAuth();
  const navigate = useNavigate();

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
          Maintenance Records
        </Typography>
        {canAccess(user, 'maintenance_add') && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/maintenance/add')}
          >
            Add Maintenance
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 600 }}>Equipment</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenance.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    No maintenance records found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              maintenance.map((record) => (
                <TableRow
                  key={record.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {equipment.find((e) => e.id === record.equipmentId)?.name ||
                      'Unknown'}
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                  <TableCell align="right">
                    {canAccess(user, 'maintenance_edit') && (
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() =>
                          navigate(`/maintenance/edit/${record.id}`)
                        }
                        title="Edit"
                      >
                        <Edit />
                      </IconButton>
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

export default MaintenanceList;