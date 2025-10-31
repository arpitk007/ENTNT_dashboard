import { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import { Close, Notifications } from '@mui/icons-material';
import { getData, dismissNotification } from '../../utils/localStorageUtils';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getData('notifications'));
  }, []);

  const handleDismiss = (id) => {
    dismissNotification(id);
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Notifications sx={{ mr: 1 }} color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
          Notifications
        </Typography>
        {notifications.length > 0 && (
          <Chip label={notifications.length} color="primary" size="small" />
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {notifications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No new notifications
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {notifications.map((n, index) => (
            <Box key={n.id}>
              <ListItem
                sx={{
                  backgroundColor: 'action.hover',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDismiss(n.id)}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={n.message}
                  secondary={new Date(n.timestamp).toLocaleString()}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default NotificationCenter;