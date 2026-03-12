import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorById, clearDoctor } from '../store/doctorSlice';
import { createAppointment } from '../store/appointmentSlice';
import './BookAppointment.css';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentDoctor, loading: doctorLoading } = useSelector((state) => state.doctors);
  const { loading: appointmentLoading, success } = useSelector((state) => state.appointments);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: '',
  });
  const { date, time, notes } = formData;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchDoctorById(id));
    return () => {
      dispatch(clearDoctor());
    };
  }, [dispatch, id, isAuthenticated, navigate]);

  useEffect(() => {
    if (success) {
      alert('Appointment booked successfully!');
      navigate('/my-appointments');
    }
  }, [success, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      specialty: currentDoctor.specialty,
      patientName: user.name,
      patientEmail: user.email,
      date,
      time,
      notes,
    };
    dispatch(createAppointment(appointmentData));
  };

  if (doctorLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!currentDoctor) {
    return (
      <div className="error-container">
        <div className="error-message">Doctor not found</div>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  // Get available days for the doctor
  const availableDays = currentDoctor.availableDays || [];

  return (
    <div className="book-appointment-page">
      <div className="container">
        <Link to={`/doctors/${id}`} className="back-link">← Back to Doctor Profile</Link>
        
        <div className="booking-container">
          <div className="doctor-info-sidebar">
            <img src={currentDoctor.image} alt={currentDoctor.name} />
            <h2>{currentDoctor.name}</h2>
            <p className="specialty">{currentDoctor.specialty}</p>
            <div className="doctor-details-mini">
              <p><strong>Experience:</strong> {currentDoctor.experience} years</p>
              <p><strong>Rating:</strong> ⭐ {currentDoctor.rating}</p>
              <p><strong>Available:</strong> {currentDoctor.availableTime}</p>
            </div>
          </div>

          <div className="booking-form-section">
            <h1>Book an Appointment</h1>
            <p className="subtitle">Fill in the details below to book your appointment</p>

            <form onSubmit={onSubmit} className="booking-form">
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="input-disabled"
                />
              </div>

              <div className="form-group">
                <label>Patient Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input-disabled"
                />
              </div>

              <div className="form-group">
                <label>Select Date *</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={onChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Select Time *</label>
                <select name="time" value={time} onChange={onChange} required>
                  <option value="">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea
                  name="notes"
                  value={notes}
                  onChange={onChange}
                  placeholder="Any additional information for the doctor..."
                  rows="4"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={appointmentLoading}>
                {appointmentLoading ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;

