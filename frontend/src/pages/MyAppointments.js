import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAppointments, cancelAppointment } from '../store/appointmentSlice';
import './MyAppointments.css';

const MyAppointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { appointments, loading, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.email) {
      dispatch(fetchMyAppointments(user.email));
    }
  }, [dispatch, isAuthenticated, navigate, user]);

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(id));
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="my-appointments-page">
      <div className="container">
        <h1>My Appointments</h1>

        {loading && <div className="loading">Loading appointments...</div>}
        
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <>
            {appointments.length === 0 ? (
              <div className="no-appointments">
                <p>You don't have any appointments yet.</p>
                <Link to="/doctors" className="btn btn-primary">
                  Find a Doctor
                </Link>
              </div>
            ) : (
              <div className="appointments-list">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-header">
                      <div className="doctor-info">
                        <h3>{appointment.doctorName}</h3>
                        <p className="specialty">{appointment.specialty}</p>
                      </div>
                      <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>

                    <div className="appointment-details">
                      <div className="detail-item">
                        <span className="label">📅 Date:</span>
                        <span>{appointment.date}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">⏰ Time:</span>
                        <span>{appointment.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">👤 Patient:</span>
                        <span>{appointment.patientName}</span>
                      </div>
                      {appointment.notes && (
                        <div className="detail-item">
                          <span className="label">📝 Notes:</span>
                          <span>{appointment.notes}</span>
                        </div>
                      )}
                    </div>

                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                      <div className="appointment-actions">
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="btn btn-danger"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

