import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MediBook
        </Link>
        
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/doctors">Doctors</Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/my-appointments">My Appointments</Link>
              </li>
              {user?.role === 'patient' && (
                <li>
                  <Link to="/patient-dashboard">Dashboard</Link>
                </li>
              )}
              {user?.role === 'doctor' && (
                <li>
                  <Link to="/doctor-dashboard">Dashboard</Link>
                </li>
              )}
              {user?.role === 'admin' && (
                <li>
                  <Link to="/admin-dashboard">Dashboard</Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className="register-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
