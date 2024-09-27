import express from 'express';
import {
  createEvent,
  getEventDetails,
  updateEvent,
  deleteEvent,
  getEventsByUser,
} from '../controllers/eventController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin and teacher can create, update, and delete events
router.route('/')
  .post(authenticate, createEvent); // Create a new event

router.route('/:id')
  .get(authenticate, getEventDetails) // Get event details
  .put(authenticate, updateEvent)      // Update event
  .delete(authenticate, deleteEvent);   // Delete event

// Students can view events they are participating in
router.route('/user/:userId')
  .get(authenticate, getEventsByUser); // Get events by user

export default router;
