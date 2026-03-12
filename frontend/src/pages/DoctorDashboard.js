import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorAppointments, acceptAppointment, rejectAppointment, completeAppointment, clearAppointmentSuccess } from '../store/appointmentSlice';
import './Dashboard.css';  // Reuse existing dashboard styles

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { appointments, loading, success, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'doctor') {
      navigate('/login');
      return;
    }
    // Mock doctor ID from user (extend user data later)
    const doctorId = user.doctorId || 1;  // Default to Dr. Sarah Smith for demo
    dispatch(fetchDoctorAppointments(doctorId));
  }, [dispatch, navigate, isAuthenticated, user]);

  useEffect(() => {
    if (success) {
      setTimeout(() => dispatch(clearAppointmentSuccess()), 3000);
    }
  }, [success, dispatch]);

  const handleAccept = (appointmentId) => {
    if (window.confirm('Accept this appointment?')) {
      dispatch(acceptAppointment(appointmentId));
    }
  };

  const handleReject = (appointmentId) => {
    if (window.confirm('Reject this appointment?')) {
      dispatch(rejectAppointment(appointmentId));
    }
  };

  const handleComplete = (appointmentId) => {
    if (window.confirm('Mark as completed?')) {
      dispatch(completeAppointment(appointmentId));
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      rejected: 'status-rejected',
      completed: 'status-completed',
    };
    return classes[status] || '';
  };

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const pendingAppts = appointments.filter(a => a.status === 'pending');
  const confirmedAppts = appointments.filter(a => a.status === 'confirmed');
  const completedAppts = appointments.filter(a => a.status === 'completed');

  return (
    <div className="dashboard-page doctor-dashboard">
      <div className="container">
        <h1>Doctor Dashboard</h1>
        <div className="welcome-message">
          <h2>Welcome, Dr. {user?.name}</h2>
          <p>Manage your appointments and patient requests</p>
        </div>

        {success && <div className="alert alert-success">Action completed successfully!</div>}

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{pendingAppts.length}</h3>
              <p>Pending Requests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <h3>{confirmedAppts.length}</h3>
              <p>Upcoming</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{completedAppts.length}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        {/* Pending Appointments - Action Required */}
        <section className="appointments-section">
          <h2>Pending Requests ({pendingAppts.length})</h2>
          {pendingAppts.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <div className="appointment-header">
                <div>
                  <h4>{appt.patientName}</h4>
                  <p>{appt.specialty} - {appt.date} at {appt.time}</p>
                </div>
                <span className={`status-badge ${getStatusBadge(appt.status)}`}>Pending</span>
              </div>
              <p><strong>Notes:</strong> {appt.notes}</p>
              <div className="appointment-actions">
                <button onClick={() => handleAccept(appt._id)} className="btn btn-success">Accept</button>
                <button onClick={() => handleReject(appt._id)} className="btn btn-danger">Reject</button>
              </div>
            </div>
          ))}
        </section>

        {/* Upcoming Appointments */}
        <section className="appointments-section">
          <h2>Upcoming Appointments ({confirmedAppts.length})</h2>
          {confirmedAppts.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <div className="appointment-header">
                <div>
                  <h4>{appt.patientName}</h4>
                  <p>{appt.date} at {appt.time}</p>
                </div>
                <span className={`status-badge ${getStatusBadge(appt.status)}`}>Confirmed</span>
              </div>
              <div className="appointment-actions">
                <button onClick={() => handleComplete(appt._id)} className="btn btn-primary">Mark Completed</button>
              </div>
            </div>
          ))}
        </section>

        {completedAppts.length > 0 && (
          <section className="appointments-section">
            <h2>Recently Completed ({completedAppts.length})</h2>
            {completedAppts.slice(0, 5).map((appt) => (
              <div key={appt._id} className="appointment-card">
                <div className="appointment-header">
                  <div>
                    <h4>{appt.patientName}</h4>
                    <p>{appt.date} at {appt.time}</p>
                  </div>
                  <span className={`status-badge status-completed`}>Completed</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;

