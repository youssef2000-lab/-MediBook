import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAppointments } from '../store/appointmentSlice';
import { fetchDoctors } from '../store/doctorSlice';
import './Dashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
  const { doctors } = useSelector((state) => state.doctors);
  const { user } = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    totalUsers: 0,
    doctorsCount: 0,
    patientsCount: 0,
    totalAppointments: 0,
  });

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  useEffect(() => {
    // Calculate stats from mock data
    const doctorsCount = doctors.length;
    const totalAppointments = appointments.length;
    const patientsCount = appointments.reduce((count, apt) => {
      if (!apt.doctorEmail) return count; // Approximate patients
      return count + 1;
    }, 0);
    
    setStats({
      totalUsers: 150, // Mock total
      doctorsCount,
      patientsCount,
      totalAppointments,
    });
  }, [doctors, appointments]);

  const getStatusCounts = () => {
    return {
      pending: appointments.filter(a => a.status === 'pending').length,
      confirmed: appointments.filter(a => a.status === 'confirmed').length,
      completed: appointments.filter(a => a.status === 'completed').length,
    };
  };

  return (
    <div className="dashboard-page admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="welcome-message">
          <h2>Welcome, Admin {user?.name}</h2>
          <p>Platform overview and management</p>
        </div>

        {/* Platform Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <h3>{stats.doctorsCount}</h3>
              <p>Doctors</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <h3>{stats.patientsCount}</h3>
              <p>Patients</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{stats.totalAppointments}</h3>
              <p>Appointments</p>
            </div>
          </div>
        </div>

        {/* Appointment Status */}
        <div className="dashboard-stats">
          {Object.entries(getStatusCounts()).map(([status, count]) => (
            <div key={status} className="stat-card">
              <div className={`stat-icon status-${status}`}>{count}</div>
              <div className="stat-info">
                <h3>{count}</h3>
                <p>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-actions">
          <h2>Admin Tools</h2>
          <div className="actions-grid">
            <div className="action-card">
              <span className="action-icon">👥</span>
              <span>User Management</span>
            </div>
            <div className="action-card">
              <span className="action-icon">👨‍⚕️</span>
              <span>Doctor Verification</span>
            </div>
            <div className="action-card">
              <span className="action-icon">⭐</span>
              <span>Review Moderation</span>
            </div>
            <div className="action-card">
              <span className="action-icon">📊</span>
              <span>Statistics</span>
            </div>
          </div>
        </div>

        {/* Recent Users/Doctors Table */}
        <div className="recent-appointments">
          <h2>Recent Activity</h2>
          {appointments.length > 0 ? (
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((apt) => (
                    <tr key={apt._id}>
                      <td>{apt.patientName}</td>
                      <td>{apt.doctorName}</td>
                      <td>{apt.date}</td>
                      <td>
                        <span className={`status status-${apt.status}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
