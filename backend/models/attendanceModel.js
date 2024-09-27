import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class', // Reference to Class model
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model (for students)
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'], // Allowed attendance statuses
    required: true,
  }
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
});

// Create the Attendance model using the schema
const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
