import express from 'express';
import {
  markAttendance,
  getClassAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendance
} from '../controllers/attendanceController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only teachers can mark attendance for all students in a class
router.route('/')
  .post(authenticate, markAttendance); // Mark attendance for class

// Routes for getting class attendance or student attendance
router.route('/:classId')
  .get(authenticate, getClassAttendance) // Get class attendance (teachers)
  .get(authenticate, getAttendance); // Retrieve attendance for a student (all subjects) or teacher (specific class)

// Routes for updating and deleting attendance based on classId and studentId
router.route('/:classId/:studentId')
  .put(authenticate, updateAttendance)  // Update attendance (teachers)
  .delete(authenticate, deleteAttendance);  // Delete attendance (teachers)

export default router;
