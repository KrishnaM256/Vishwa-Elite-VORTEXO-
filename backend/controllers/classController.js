import Class from '../models/classModel.js'
import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const createClass = asyncHandler(async (req, res) => {
  const { className, department, year, classTeacher, students, subjects } =
    req.body
  console.log('user', req.body)

  const teacher = await User.findById(classTeacher)
  if (!teacher || teacher.role !== 'teacher') {
    res.status(400)
    throw new Error('Invalid class teacher')
  }

  const newClass = new Class({
    className,
    department,
    year,
    classTeacher,
    students,
    subjects,
  })

  await newClass.save()
  res.status(201).json({ message: 'Class created successfully', newClass })
})

export const getClassDetails = asyncHandler(async (req, res) => {
  const classDetails = await Class.findById(req.params.id)
    .populate('classTeacher', 'name email')
    .populate('students', 'name email')

  if (!classDetails) {
    res.status(404)
    throw new Error('Class not found')
  }

  res.status(200).json(classDetails)
})

export const updateClass = asyncHandler(async (req, res) => {
  const { className, department, year, classTeacher, students, subjects } =
    req.body

  const updatedClass = await Class.findByIdAndUpdate(
    req.params.id,
    { className, department, year, classTeacher, students, subjects },
    { new: true, runValidators: true }
  )

  if (!updatedClass) {
    res.status(404)
    throw new Error('Class not found')
  }

  res.status(200).json({ message: 'Class updated successfully', updatedClass })
})

export const deleteClass = asyncHandler(async (req, res) => {
  const classToDelete = await Class.findByIdAndDelete(req.params.id)

  if (!classToDelete) {
    res.status(404)
    throw new Error('Class not found')
  }

  res.status(200).json({ message: 'Class deleted successfully' })
})

export const getAllClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find({})
    .populate('classTeacher', 'name email')
    .populate('students', 'name email')
    .select('className department year classTeacher students subjects')

  if (!classes) {
    res.status(404)
    throw new Error('No classes found')
  }

  res
    .status(200)
    .json({ message: 'All classes retrieved successfully', classes })
})
