import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-image">
        {doctor.photo ? (
          <img src={doctor.photo} alt={doctor.name} />
        ) : (
          <div className="doctor-placeholder">
            <span>{doctor.name?.charAt(0) || 'D'}</span>
          </div>
        )}
      </div>
      
      <div className="doctor-info">
        <h3>Dr. {doctor.name}</h3>
        <p className="doctor-specialty">{doctor.specialty}</p>
        <p className="doctor-description">{doctor.description}</p>
        
        <div className="doctor-details">
          <span className="doctor-location">
            📍 {doctor.location || 'Not specified'}
          </span>
          <span className="doctor-phone">
            📞 {doctor.phone || 'Not available'}
          </span>
        </div>
        
        <div className="doctor-rating">
          {'★'.repeat(Math.round(doctor.rating || 0))}
          {'☆'.repeat(5 - Math.round(doctor.rating || 0))}
          <span>({doctor.reviewsCount || 0} reviews)</span>
        </div>
        
        <Link to={`/doctors/${doctor._id}`} className="doctor-btn">
          View Details & Book
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;

