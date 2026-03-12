
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MediBook</h3>
          <p>Your trusted medical appointment booking platform</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@medibook.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 MediBook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

