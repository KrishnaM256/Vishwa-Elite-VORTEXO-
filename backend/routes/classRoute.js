import express from 'express';
import { createClass, getClassDetails, updateClass, deleteClass } from '../controllers/classController.js';
import { authenticate, authorized } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Class Routes
router
  .route('/')
  .post(authenticate, authorized, createClass); // Create a new class (Admin or teacher only)

router
  .route('/:id')
  .get(authenticate, getClassDetails) // Get class details by ID
  .put(authenticate, authorized, updateClass) // Update class details (Admin or teacher only)
  .delete(authenticate, authorized, deleteClass); // Delete a class (Admin or teacher only)

export default router;
