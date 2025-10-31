import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Dashboard,
  Construction,
  EventNote,
  Build,
  Logout,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { canAccess } from '../utils/roleUtils';

const Header = ({ toggleTheme, darkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!user) return null;

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      onClick: () => navigate('/dashboard'),
      show: true,
    },
    {
      text: 'Equipment',
      icon: <Construction />,
      onClick: () => navigate('/equipment'),
      show: canAccess(user, 'equipment_add'),
    },
    {
      text: 'Rentals',
      icon: <EventNote />,
      onClick: () => navigate('/rentals'),
      show: canAccess(user, 'rentals_create'),
    },
    {
      text: 'Maintenance',
      icon: <Build />,
      onClick: () => navigate('/maintenance'),
      show: canAccess(user, 'maintenance_add'),
    },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  item.onClick();
                  setDrawerOpen(false);
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </Box>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              toggleTheme();
              setDrawerOpen(false);
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </Box>
            <ListItemText primary="Toggle Theme" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              logout();
              setDrawerOpen(false);
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <Logout />
            </Box>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ENTNT Rental Dashboard
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems
                .filter((item) => item.show)
                .map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    startIcon={item.icon}
                    onClick={item.onClick}
                  >
                    {item.text}
                  </Button>
                ))}
              <IconButton color="inherit" onClick={toggleTheme}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button
                color="inherit"
                startIcon={<Logout />}
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;