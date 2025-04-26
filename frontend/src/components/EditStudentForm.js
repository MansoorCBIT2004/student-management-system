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
        const response = await axios.get('https://student-management-system-7nnu.onrender.com/students');
        const students = response.data;

        const student = students.find(s => s._id === id);
        if (!student) {
          toast.error('Student not found');
          navigate('/students');
          return;
        }

        setFormData({
          student_id: student.student_id,
          name: student.name,
          email: student.email,
          DOB: student.DOB ? student.DOB.substring(0, 10) : '',
          department: student.department,
          enrollmentyear: student.enrollmentyear,
          isactive: student.isactive
        });
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, navigate]);

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
      console.error('Error updating student:', error);
      toast.error('Failed to update student');
    }
  };

  if (loading) return <p>Loading student data...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#282c34' }}>Edit Student</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Form fields */}
        {['student_id', 'name', 'email', 'DOB', 'department', 'enrollmentyear'].map((field) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={field} style={{ marginBottom: '5px', fontWeight: '600' }}>{field.toUpperCase()}:</label>
            <input
              id={field}
              type={field === 'DOB' ? 'date' : (field === 'email' ? 'email' : (field === 'enrollmentyear' ? 'number' : 'text'))}
              name={field}
              value={formData[field]}
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
        ))}

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
            cursor: 'pointer'
          }}
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudentForm;
