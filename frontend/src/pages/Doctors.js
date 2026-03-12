import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors, searchDoctors } from '../store/doctorSlice';
import DoctorCard from '../components/DoctorCard';
import './Doctors.css';

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error, searchResults } = useSelector((state) => state.doctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchDoctors(searchTerm));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    dispatch(fetchDoctors());
  };

  const handleSpecialtyChange = (e) => {
    setSpecialtyFilter(e.target.value);
  };

  const displayedDoctors = searchTerm ? searchResults : doctors;
  const filteredDoctors = specialtyFilter
    ? displayedDoctors.filter((doc) => doc.specialty === specialtyFilter)
    : displayedDoctors;

  const specialties = [...new Set(doctors.map((doc) => doc.specialty))];

  return (
    <div className="doctors-page">
      <div className="container">
        <h1>Find a Doctor</h1>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            {searchTerm && (
              <button type="button" onClick={handleClearSearch} className="btn btn-secondary">
                Clear
              </button>
            )}
          </form>

          <div className="filter-section">
            <label>Filter by Specialty:</label>
            <select value={specialtyFilter} onChange={handleSpecialtyChange}>
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && <div className="loading">Loading doctors...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Doctors Grid */}
        {!loading && !error && (
          <div className="doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <div className="no-results">
                <p>No doctors found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;

