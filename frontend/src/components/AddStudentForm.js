import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './addstudentform.css';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    email: '',
    DOB: '',
    department: '',
    enrollmentyear: '',
    isactive: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://student-management-system-7nnu.onrender.com/students', {
        student_id: formData.student_id,
        name: formData.name,
        email: formData.email,
        DOB: formData.DOB,
        department: formData.department,
        enrollmentyear: Number(formData.enrollmentyear),
        isactive: formData.isactive,
      });
      toast.success('Student added successfully!');
      navigate('/students'); // Redirect after success
    } catch (error) {
      console.error('Error adding student:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add student';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="add-student-container">
      <h2 className="add-student-title">Add New Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
        <div className="form-group">
          <label htmlFor="student_id">Student ID:</label>
          <input
            id="student_id"
            type="text"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="DOB">Date of Birth:</label>
          <input
            id="DOB"
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="enrollmentyear">Enrollment Year:</label>
          <input
            id="enrollmentyear"
            type="number"
            name="enrollmentyear"
            value={formData.enrollmentyear}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear()} // To prevent future years
          />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="isactive">Is Active:</label>
          <input
            id="isactive"
            type="checkbox"
            name="isactive"
            checked={formData.isactive}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="add-student-button">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
