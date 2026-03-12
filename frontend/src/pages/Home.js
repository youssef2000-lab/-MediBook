import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { doctors } = useSelector((state) => state.doctors);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MediBook</h1>
          <p>Your trusted platform for booking medical appointments</p>
          <div className="hero-buttons">
            <Link to="/doctors" className="btn btn-primary">
              Find a Doctor
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-secondary">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose MediBook?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Expert Doctors</h3>
            <p>Access to highly qualified medical professionals across various specialties</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Book appointments online anytime, anywhere with just a few clicks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Quick Confirmation</h3>
            <p>Get instant appointment confirmations and reminders</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Manage Online</h3>
            <p>View and manage all your appointments from your personal dashboard</p>
          </div>
        </div>
      </section>

      {/* Doctors Preview Section */}
      <section className="doctors-preview">
        <h2>Our Top Doctors</h2>
        <div className="doctors-grid">
          {doctors.slice(0, 3).map((doctor) => (
            <div key={doctor.id} className="doctor-preview-card">
              <img src={doctor.image} alt={doctor.name} />
              <h3>{doctor.name}</h3>
              <p className="specialty">{doctor.specialty}</p>
              <p className="rating">⭐ {doctor.rating}</p>
              <Link to={`/doctors/${doctor.id}`} className="btn btn-outline">
                View Profile
              </Link>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/doctors" className="btn btn-primary">
            View All Doctors
          </Link>
        </div>
      </section>

      {/* User Dashboard Link */}
      {isAuthenticated && (
        <section className="dashboard-link">
          <h2>Go to Your Dashboard</h2>
          <p>Manage your appointments and profile</p>
          <Link to="/dashboard" className="btn btn-primary">
            My Dashboard
          </Link>
        </section>
      )}

      {/* Auth Status */}
      <section className="auth-status">
        {isAuthenticated ? (
          <div className="user-info">
            <p>Welcome, {user?.name}!</p>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-prompt">
            <p>Already have an account?</p>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

