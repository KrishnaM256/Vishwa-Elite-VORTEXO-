import express from 'express'
import {
  createClass,
  getClassDetails,
  updateClass,
  deleteClass,
  getAllClasses,
} from '../controllers/classController.js'

import { authenticate, authorized } from '../middlewares/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(authenticate, authorized, createClass)
  .get(authenticate, authorized, getAllClasses)

router
  .route('/:id')
  .get(authenticate, getClassDetails)
  .put(authenticate, authorized, updateClass)
  .delete(authenticate, authorized, deleteClass)

export default router
