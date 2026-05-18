import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/shared/AppLayout';
import { RoleGuard } from './components/shared/RoleGuard';

import LoginPage from './pages/auth/LoginPage';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import UserManagementPage from './pages/superadmin/UserManagementPage';
import PaymentConfigPage from './pages/superadmin/PaymentConfigPage';
import WaterAdminDashboard from './pages/water/WaterAdminDashboard';
import WaterPOS from './pages/water/WaterPOS';
import WaterProductsPage from './pages/water/WaterProductsPage';
import RBManagerDashboard from './pages/rb/RBManagerDashboard';
import RBPOS from './pages/rb/RBPOS';
import RBStockPage from './pages/rb/RBStockPage';
import DriverDashboard from './pages/delivery/DriverDashboard';
import DebtManagementPage from './pages/delivery/DebtManagementPage';
import GPSTrackerPage from './pages/delivery/GPSTrackerPage';
import RevenuePage from './pages/shared/RevenuePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<AppLayout />}>
            <Route path="/super-admin/dashboard" element={<RoleGuard allowedRoles={['super_admin']}><SuperAdminDashboard /></RoleGuard>} />
            <Route path="/super-admin/users" element={<RoleGuard allowedRoles={['super_admin']}><UserManagementPage /></RoleGuard>} />
            <Route path="/super-admin/payment-config" element={<RoleGuard allowedRoles={['super_admin']}><PaymentConfigPage /></RoleGuard>} />
            <Route path="/super-admin/revenue" element={<RoleGuard allowedRoles={['super_admin']}><RevenuePage business="water_retail" /></RoleGuard>} />
            <Route path="/super-admin/debts" element={<RoleGuard allowedRoles={['super_admin']}><DebtManagementPage /></RoleGuard>} />
            <Route path="/water/admin/dashboard" element={<RoleGuard allowedRoles={['water_admin','super_admin']}><WaterAdminDashboard /></RoleGuard>} />
            <Route path="/water/admin/products" element={<RoleGuard allowedRoles={['water_admin','super_admin']}><WaterProductsPage /></RoleGuard>} />
            <Route path="/water/admin/revenue" element={<RoleGuard allowedRoles={['water_admin','super_admin']}><RevenuePage business="water_retail" /></RoleGuard>} />
            <Route path="/water/cashier/pos" element={<RoleGuard allowedRoles={['water_cashier','super_admin']}><WaterPOS /></RoleGuard>} />
            <Route path="/water/driver/dashboard" element={<RoleGuard allowedRoles={['driver','super_admin']}><DriverDashboard /></RoleGuard>} />
            <Route path="/water/driver/debts" element={<RoleGuard allowedRoles={['driver','water_admin','super_admin']}><DebtManagementPage /></RoleGuard>} />
            <Route path="/water/driver/gps" element={<RoleGuard allowedRoles={['driver','water_admin','super_admin']}><GPSTrackerPage /></RoleGuard>} />
            <Route path="/rb/manager/dashboard" element={<RoleGuard allowedRoles={['rb_manager','super_admin']}><RBManagerDashboard /></RoleGuard>} />
            <Route path="/rb/manager/stock" element={<RoleGuard allowedRoles={['rb_manager','super_admin']}><RBStockPage /></RoleGuard>} />
            <Route path="/rb/manager/revenue" element={<RoleGuard allowedRoles={['rb_manager','super_admin']}><RevenuePage business="rb" /></RoleGuard>} />
            <Route path="/rb/cashier/pos" element={<RoleGuard allowedRoles={['rb_cashier','super_admin']}><RBPOS /></RoleGuard>} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
