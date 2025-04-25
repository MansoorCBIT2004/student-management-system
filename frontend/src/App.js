import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import EditStudentForm from './components/EditStudentForm';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#282c34',
          color: 'white',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
            Student Management
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '700' }}>Home</Link>
            <Link to="/students/add" style={{ color: 'white', textDecoration: 'none', fontWeight: '700' }}>Add Student</Link>
            <Link to="/students" style={{ color: 'white', textDecoration: 'none', fontWeight: '700' }}>Student List</Link>
          </div>
        </nav>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<AddStudentForm />} />
          <Route path="/students/edit/:id" element={<EditStudentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
