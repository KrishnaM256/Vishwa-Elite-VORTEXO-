import express from 'express';
import { createSchedule, getClassSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/', createSchedule); // Create a new schedule
router.get('/:classId', getClassSchedule); // Get schedule for a specific class
router.put('/:id', updateSchedule); // Update schedule
router.delete('/:id', deleteSchedule); // Delete schedule

export default router;
