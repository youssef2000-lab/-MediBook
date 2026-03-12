
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllAppointments } from '../store/appointmentSlice';
import { fetchDoctors } from '../store/doctorSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { appointments, loading: appointmentsLoading } = useSelector((state) => state.appointments);
  const { doctors, loading: doctorsLoading } = useSelector((state) => state.doctors);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role === 'doctor') {
      dispatch(fetchAllAppointments());
      dispatch(fetchDoctors());
    }
  }, [dispatch, isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return null;
  }

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Dashboard</h1>
        
        <div className="welcome-message">
          <h2>Welcome, {user?.name}</h2>
          <p>Your Role: {user?.role === 'admin' ? 'Admin' : user?.role === 'doctor' ? 'Doctor' : 'User'}</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{pendingCount}</h3>
              <p>Pending Appointments</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <h3>{confirmedCount}</h3>
              <p>Confirmed Appointments</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{completedCount}</h3>
              <p>Completed Appointments</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <h3>{doctors.length}</h3>
              <p>Doctors</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/doctors" className="action-card">
              <span className="action-icon">🔍</span>
              <span className="action-text">Browse Doctors</span>
            </Link>
            
            <Link to="/my-appointments" className="action-card">
              <span className="action-icon">📋</span>
              <span className="action-text">My Appointments</span>
            </Link>
            
            {user?.role === 'admin' && (
              <Link to="/doctors" className="action-card">
                <span className="action-icon">➕</span>
                <span className="action-text">Add Doctor</span>
              </Link>
            )}
          </div>
        </div>

        <div className="recent-appointments">
          <h2>Recent Appointments</h2>
          {appointmentsLoading || doctorsLoading ? (
            <div className="loading">Loading...</div>
          ) : appointments.length > 0 ? (
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.patientName || 'N/A'}</td>
                      <td>{new Date(appointment.date).toLocaleDateString()}</td>
                      <td>{appointment.time || 'N/A'}</td>
                      <td>
                        <span className={`status status-${appointment.status}`}>
                          {appointment.status === 'pending' && 'Pending'}
                          {appointment.status === 'confirmed' && 'Confirmed'}
                          {appointment.status === 'completed' && 'Completed'}
                          {appointment.status === 'cancelled' && 'Cancelled'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">No appointments found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

