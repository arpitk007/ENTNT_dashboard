import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { RentalsProvider } from './contexts/RentalsContext';
import { MaintenanceProvider } from './contexts/MaintenanceContext';
import { canAccess } from './utils/roleUtils';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EquipmentPage from './pages/EquipmentPage';
import EquipmentDetailPage from './pages/EquipmentDetailPage';
import EquipmentForm from './components/Equipment/EquipmentForm';
import RentalsPage from './pages/RentalsPage';
import RentalForm from './components/Rentals/RentalForm';
import MaintenancePage from './pages/MaintenancePage';
import MaintenanceForm from './components/Maintenance/MaintenanceForm';

const ProtectedRoute = ({ children, requiredFeature }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login/customer" />;
  if (requiredFeature && !canAccess(user, requiredFeature)) return <Navigate to="/dashboard" />;
  return children;
};

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment"
            element={
              <ProtectedRoute requiredFeature="equipment_add">
                <EquipmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment/:id"
            element={
              <ProtectedRoute>
                <EquipmentDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment/add"
            element={
              <ProtectedRoute requiredFeature="equipment_add">
                <EquipmentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment/edit/:id"
            element={
              <ProtectedRoute requiredFeature="equipment_edit">
                <EquipmentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rentals"
            element={
              <ProtectedRoute requiredFeature="rentals_create">
                <RentalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rentals/add"
            element={
              <ProtectedRoute requiredFeature="rentals_create">
                <RentalForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance"
            element={
              <ProtectedRoute requiredFeature="maintenance_add">
                <MaintenancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance/add"
            element={
              <ProtectedRoute requiredFeature="maintenance_add">
                <MaintenanceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance/edit/:id"
            element={
              <ProtectedRoute requiredFeature="maintenance_edit">
                <MaintenanceForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <EquipmentProvider>
        <RentalsProvider>
          <MaintenanceProvider>
            <AppContent />
          </MaintenanceProvider>
        </RentalsProvider>
      </EquipmentProvider>
    </AuthProvider>
  );
}

export default App;