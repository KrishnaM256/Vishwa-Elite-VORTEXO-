import  Class  from '../models/classModel.js';
import User  from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js'

// Create a new class
export const createClass = asyncHandler(async (req, res) => {
    const { className, department, year, classTeacher, students, subjects } = req.body;
   console.log('user',req.body);

    // Check if teacher exists and has a teacher role
    const teacher = await User.findById(classTeacher);
    if (!teacher || teacher.role !== 'teacher') {
        res.status(400);
        throw new Error('Invalid class teacher');
    }

    const newClass = new Class({
        className,
        department,
        year,
        classTeacher,
        students,
        subjects
    });

    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', newClass });
});

// Get class details by ID
export const getClassDetails = asyncHandler(async (req, res) => {
    const classDetails = await Class.findById(req.params.id)
        .populate('classTeacher', 'name email')
        .populate('students', 'name email');

    if (!classDetails) {
        res.status(404);
        throw new Error('Class not found');
    }

    res.status(200).json(classDetails);
});

// Update class details
export const updateClass = asyncHandler(async (req, res) => {
    const { className, department, year, classTeacher, students, subjects } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
        req.params.id,
        { className, department, year, classTeacher, students, subjects },
        { new: true, runValidators: true }
    );

    if (!updatedClass) {
        res.status(404);
        throw new Error('Class not found');
    }

    res.status(200).json({ message: 'Class updated successfully', updatedClass });
});

// Delete a class
export const deleteClass = asyncHandler(async (req, res) => {
    const classToDelete = await Class.findByIdAndDelete(req.params.id);

    if (!classToDelete) {
        res.status(404);
        throw new Error('Class not found');
    }

    res.status(200).json({ message: 'Class deleted successfully' });
});
