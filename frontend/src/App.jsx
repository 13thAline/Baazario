import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import Loader from './components/Loader';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AboutPage from './pages/AboutPage';
import DashboardLayout from './layouts/DashboardLayout';
import VendorDashboard from './pages/VendorDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import UpdateProfilePage from './pages/UpdateProfilePage';
import ContactPage from './pages/ContactPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<VendorDashboard />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

const AppWrapper = () => {
  const { isLoading } = useLoading();
  return isLoading ? <Loader /> : <AppRoutes />;
};

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AppWrapper />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;