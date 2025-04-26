import React from 'react';
import { FaUserGraduate, FaEdit, FaPlusCircle } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">
        Welcome to the Student Management System
      </h1>
      <p className="homepage-subtitle">
        Use the navigation above to view, add, or edit students.
      </p>
      <div className="homepage-cards">
        <div className="homepage-card">
          <FaUserGraduate size={48} className="homepage-card-icon" />
          <h2 className="homepage-card-title">Tracking</h2>
          <p className="homepage-card-text">Track student information efficiently.</p>
        </div>
        <div className="homepage-card">
          <FaEdit size={48} className="homepage-card-icon" />
          <h2 className="homepage-card-title">Editable</h2>
          <p className="homepage-card-text">Easily edit student details.</p>
        </div>
        <div className="homepage-card">
          <FaPlusCircle size={48} className="homepage-card-icon" />
          <h2 className="homepage-card-title">Add Your Data</h2>
          <p className="homepage-card-text">Add new students to the system.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;