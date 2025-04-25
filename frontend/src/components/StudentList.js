import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://student-management-system-7nnu.onrender.com/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch students');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axios.delete(`https://student-management-system-7nnu.onrender.com/students/${id}`);
      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div style={{
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#282c34' }}>Student List</h2>
     
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '600px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Student ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>DOB</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Enrollment Year</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Is Active</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.student_id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.DOB ? student.DOB.substring(0, 10) : ''}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.department}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.enrollmentyear}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                    <input type="checkbox" checked={student.isactive} readOnly />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <Link
                      to={`/students/edit/${student._id}`}
                      style={{
                        marginRight: '10px',
                        color: '#007bff',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c82333'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc3545'}
                    >
                      Delete
                    </button>
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

export default StudentList;
