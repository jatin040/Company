import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './component/auth/LoginPage';
import SuperAdminDashboard from './component/dashboard/superadmin';
import VendorDashboard from './component/dashboard/VendorDashboard';
import EmployeeDashboard from './component/dashboard/EmployeeDashboard';
import CreateVendor from './pages/functionality/createvendor';
import CreateEmployee from './pages/functionality/createemployee';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setIsAuthenticated(true);
      setRole(savedRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('role', userRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    localStorage.removeItem('role');
  };

  // Protected route component for role-based access
  const ProtectedRoute = ({ children, roleRequired }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    if (role !== roleRequired) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to={`/${role}`} /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/superadmin" 
          element={
            <ProtectedRoute roleRequired="superadmin">
              <SuperAdminDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/vendor" 
          element={
            <ProtectedRoute roleRequired="vendor">
              <VendorDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute roleRequired="employee">
              <EmployeeDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        {/* Protected route for Create Vendor, accessible only to superadmin */}
        <Route 
          path="/create-vendor" 
          element={
            <ProtectedRoute roleRequired="superadmin">
              <CreateVendor />
            </ProtectedRoute>
          } 
        />
        {/* Protected route for Create Employee, accessible only to vendor */}
        <Route 
          path="/create-employee" 
          element={
            <ProtectedRoute roleRequired="vendor">
              <CreateEmployee />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
