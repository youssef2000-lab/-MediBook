import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorById, clearDoctor } from '../store/doctorSlice';
import './DoctorDetails.css';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentDoctor, loading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
    return () => {
      dispatch(clearDoctor());
    };
  }, [dispatch, id]);

  if (loading) {
    return <div className="loading">Loading doctor details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  if (!currentDoctor) {
    return (
      <div className="error-container">
        <div className="error-message">Doctor not found</div>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <div className="doctor-details-page">
      <div className="container">
        <Link to="/doctors" className="back-link">← Back to Doctors</Link>
        
        <div className="doctor-details-card">
          <div className="doctor-image-section">
            <img src={currentDoctor.image} alt={currentDoctor.name} />
            <div className="rating-badge">
              <span>⭐ {currentDoctor.rating}</span>
            </div>
          </div>

          <div className="doctor-info-section">
            <h1>{currentDoctor.name}</h1>
            <p className="specialty">{currentDoctor.specialty}</p>
            <p className="experience">{currentDoctor.experience} Years Experience</p>

            <div className="info-grid">
              <div className="info-item">
                <strong>📞 Phone:</strong>
                <span>{currentDoctor.phone}</span>
              </div>
              <div className="info-item">
                <strong>📧 Email:</strong>
                <span>{currentDoctor.email}</span>
              </div>
              <div className="info-item">
                <strong>📍 Address:</strong>
                <span>{currentDoctor.address}</span>
              </div>
            </div>

            <div className="availability">
              <h3>Availability</h3>
              <div className="availability-info">
                <p><strong>Days:</strong> {currentDoctor.availableDays?.join(', ')}</p>
                <p><strong>Time:</strong> {currentDoctor.availableTime}</p>
              </div>
            </div>

            <div className="bio-section">
              <h3>About</h3>
              <p>{currentDoctor.bio}</p>
            </div>

            <button 
              onClick={() => navigate(`/book-appointment/${currentDoctor.id}`)}
              className="btn btn-primary btn-lg"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

