import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchMyAppointments } from '../store/appointmentSlice';
import AppointmentCard from '../components/AppointmentCard';
import './Dashboard.css';

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'patient') {
      navigate('/login');
      return;
    }
    dispatch(fetchMyAppointments(user.email));
  }, [dispatch, navigate, isAuthenticated, user]);

  return (
    <div className="dashboard-page patient-dashboard">
      <div className="container">
        <h1>Patient Dashboard</h1>
        <div className="welcome-message">
          <h2>Welcome, {user?.name}</h2>
          <p>Manage your appointments and medical history</p>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/doctors" className="action-card">
              <span className="action-icon">🔍</span>
              <span>Find Doctors</span>
            </Link>
            <Link to="/my-appointments" className="action-card">
              <span className="action-icon">📅</span>
              <span>My Appointments</span>
            </Link>
            <Link to="/profile" className="action-card">
              <span className="action-icon">👤</span>
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <section className="appointments-section">
          <h2>Upcoming Appointments</h2>
          {appointments.filter(a => ['pending', 'confirmed'].includes(a.status)).map((appt) => (
            <AppointmentCard key={appt._id} appointment={appt} />
          ))}
        </section>

        {/* Recent History */}
        <section className="appointments-section">
          <h2>Appointment History</h2>
          {appointments.filter(a => ['completed', 'rejected', 'cancelled'].includes(a.status)).slice(0, 5).map((appt) => (
            <div key={appt._id} className="appointment-card">
              <h4>{appt.doctorName} - {appt.specialty}</h4>
              <p>{appt.date} | {appt.time} | Status: {appt.status}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;

