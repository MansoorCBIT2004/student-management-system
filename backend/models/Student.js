const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  DOB: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  enrollmentyear: {
    type: Number,
    required: true,
    min: 1900
  },
  isactive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;