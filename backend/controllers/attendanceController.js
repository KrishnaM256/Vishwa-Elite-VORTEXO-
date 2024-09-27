import asyncHandler from 'express-async-handler';
import Attendance from '../models/attendanceModel.js';

// Mark attendance for all students in a class (only teachers)
export const markAttendance = asyncHandler(async (req, res) => {
  const { classId, attendanceRecords } = req.body; // attendanceRecords contains studentId and status
  const { role } = req.user;

  if (role !== 'teacher') {
    return res.status(403).json({ message: 'Only teachers can mark attendance.' });
  }

  try {
    const newAttendances = await Attendance.insertMany(
      attendanceRecords.map(record => ({
        classId,
        studentId: record.studentId,
        date: record.date,
        status: record.status,
      }))
    );

    res.status(201).json({ message: 'Attendance marked successfully', attendance: newAttendances });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get attendance for a specific class (only teachers)
export const getClassAttendance = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { role } = req.user;

  if (role !== 'teacher') {
    return res.status(403).json({ message: 'Only teachers can view class attendance.' });
  }

  try {
    const attendance = await Attendance.find({ classId }).populate('studentId');
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance records found for this class' });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update attendance for all students in a class (only teachers)
export const updateAttendance = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { role } = req.user;

  if (role !== 'teacher') {
    return res.status(403).json({ message: 'Only teachers can update attendance.' });
  }

  const { studentId, status, date } = req.body;

  try {
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { classId, studentId, date }, 
      { status },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance updated successfully', attendance: updatedAttendance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete attendance for a specific student in a class (only teachers)
export const deleteAttendance = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.params;
  const { role } = req.user;

  if (role !== 'teacher') {
    return res.status(403).json({ message: 'Only teachers can delete attendance.' });
  }

  try {
    const deletedAttendance = await Attendance.findOneAndDelete({ classId, studentId });
    if (!deletedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get attendance for a specific class (teacher) or all subjects (student)
export const getAttendance = asyncHandler(async (req, res) => {
    const userId = req.user._id;  // Logged-in user ID
    const userRole = req.user.role;  // User's role: 'student' or 'teacher'
    const { classId } = req.params;  // Class ID from URL
  
    try {
      // If the user is a student, retrieve their attendance across all subjects
      if (userRole === 'student') {
        const attendanceRecords = await Attendance.find({ studentId: userId }).populate('classId');
        res.status(200).json(attendanceRecords);
      }
      // If the user is a teacher, retrieve attendance for a specific class
      else if (userRole === 'teacher') {
        if (!classId) {
          return res.status(400).json({ message: 'Class ID is required for teachers' });
        }
        const attendanceRecords = await Attendance.find({ classId }).populate('studentId');
        res.status(200).json(attendanceRecords);
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });