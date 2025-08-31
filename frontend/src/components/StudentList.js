import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://student-management-system-m1.onrender.com');
        
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          console.error('Unexpected API response:', response.data);
          toast.error('Unexpected response from server');
        }

      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axios.delete(`https://student-management-system-7nnu.onrender.com/students/${id}`);
      toast.success('Student deleted successfully');
      // Remove from list
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
    }
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Student List</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={theadRowStyle}>
                <th style={cellStyle}>Student ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>DOB</th>
                <th style={cellStyle}>Department</th>
                <th style={cellStyle}>Enrollment Year</th>
                <th style={cellStyle}>Is Active</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} style={rowStyle}>
                  <td style={cellStyle}>{student.student_id}</td>
                  <td style={cellStyle}>{student.name}</td>
                  <td style={cellStyle}>{student.email}</td>
                  <td style={cellStyle}>{student.DOB ? student.DOB.substring(0, 10) : '-'}</td>
                  <td style={cellStyle}>{student.department}</td>
                  <td style={cellStyle}>{student.enrollmentyear}</td>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>
                    <input type="checkbox" checked={student.isactive} readOnly />
                  </td>
                  <td style={cellStyle}>
                    <Link to={`/students/edit/${student._id}`} style={editButtonStyle}>Edit</Link>
                    <button onClick={() => handleDelete(student._id)} style={deleteButtonStyle}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const containerStyle = {
  padding: '20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  maxWidth: '900px',
  margin: '0 auto'
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#282c34'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '600px'
};

const theadRowStyle = {
  backgroundColor: '#f0f0f0'
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left'
};

const rowStyle = {
  borderBottom: '1px solid #ddd'
};

const editButtonStyle = {
  marginRight: '10px',
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600'
};

const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.3s ease'
};

export default StudentList;


