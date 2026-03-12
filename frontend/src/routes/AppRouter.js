
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Doctors from '../pages/Doctors';
import DoctorDetails from '../pages/DoctorDetails';
import BookAppointment from '../pages/BookAppointment';
import MyAppointments from '../pages/MyAppointments';
import Dashboard from '../pages/Dashboard';
import PatientDashboard from '../pages/PatientDashboard';
import DoctorDashboard from '../pages/DoctorDashboard';
import AdminDashboard from '../pages/AdminDashboard';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/book-appointment/:id" element={<BookAppointment />} />
      <Route path="/my-appointments" element={
        <ProtectedRoute>
          <MyAppointments />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        isAuthenticated ? (
          user?.role === 'patient' ? <Navigate to="/patient-dashboard" replace /> :
          user?.role === 'doctor' ? <Navigate to="/doctor-dashboard" replace /> :
          user?.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> :
          <Dashboard />
        ) : <Navigate to="/login" replace />
      } />
      
      <Route path="/patient-dashboard" element={
        <ProtectedRoute allowedRole="patient">
          <PatientDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/doctor-dashboard" element={
        <ProtectedRoute allowedRole="doctor">
          <DoctorDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRouter;

