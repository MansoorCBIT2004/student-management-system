import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    email: '',
    DOB: '',
    department: '',
    enrollmentyear: '',
    isactive: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`https://student-management-system-7nnu.onrender.com/students/${id}`);
        setFormData({
          student_id: response.data.student_id,
          name: response.data.name,
          email: response.data.email,
          DOB: response.data.DOB ? response.data.DOB.substring(0, 10) : '',
          department: response.data.department,
          enrollmentyear: response.data.enrollmentyear,
          isactive: response.data.isactive
        });
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch student data');
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://student-management-system-7nnu.onrender.com/students/${id}`, {
        student_id: formData.student_id,
        name: formData.name,
        email: formData.email,
        DOB: formData.DOB,
        department: formData.department,
        enrollmentyear: Number(formData.enrollmentyear),
        isactive: formData.isactive
      });
      toast.success('Student updated successfully');
      navigate('/students');
    } catch (error) {
      toast.error('Failed to update student');
    }
  };

  if (loading) return <p>Loading student data...</p>;

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#282c34' }}>Edit Student</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="student_id" style={{ marginBottom: '5px', fontWeight: '600' }}>Student ID:</label>
          <input
            id="student_id"
            type="text"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="name" style={{ marginBottom: '5px', fontWeight: '600' }}>Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: '600' }}>Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="DOB" style={{ marginBottom: '5px', fontWeight: '600' }}>Date of Birth:</label>
          <input
            id="DOB"
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="department" style={{ marginBottom: '5px', fontWeight: '600' }}>Department:</label>
          <input
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="enrollmentyear" style={{ marginBottom: '5px', fontWeight: '600' }}>Enrollment Year:</label>
          <input
            id="enrollmentyear"
            type="number"
            name="enrollmentyear"
            value={formData.enrollmentyear}
            onChange={handleChange}
            required
            min="1900"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="isactive" style={{ marginBottom: 0, fontWeight: '600' }}>Is Active:</label>
          <input
            id="isactive"
            type="checkbox"
            name="isactive"
            checked={formData.isactive}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#282c34',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3c4048'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#282c34'}
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudentForm;
