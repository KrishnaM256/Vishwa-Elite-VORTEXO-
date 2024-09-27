import express from 'express'
const router = express.Router()
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUserById,
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  deleteUser,
  resetPassword,
  getStudents,
  getTeachers,
} from '../controllers/userController.js'
import { authenticate, authorized } from '../middlewares/authMiddleware.js'
import { upload } from '../utils/multer.js'

router
  .route('/')
  .get(authenticate, getUserProfile)
  .put(
    authenticate,
    upload.fields([{ name: 'avatar', maxCount: 1 }]),
    updateUserProfile
  )

router.post(
  '/register',
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  createUser
)

router.route('/students').get(getStudents)
router.route('/teachers').get(getTeachers)

router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').put(resetPassword)

router.route('/usersList').get(authenticate, authorized, getAllUsers)

router
  .route('/:id')
  .get(authenticate, authorized, getUserById)
  .delete(authenticate, authorized, deleteUser)
  .put(authenticate, authorized, updateUserById)

export default router
