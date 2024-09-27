import Schedule from '../models/scheduleModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Create a new schedule
export const createSchedule = asyncHandler(async (req, res) => {
  const { classId, subject, teacherId, time, day, location } = req.body;
  
  const newSchedule = new Schedule({ classId, subject, teacherId, time, day, location });
  await newSchedule.save();
  
  res.status(201).json({ message: 'Schedule created successfully', schedule: newSchedule });
});

// Get schedule for a specific class
export const getClassSchedule = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  
  const schedule = await Schedule.find({ classId }).populate('teacherId');
  
  res.status(200).json(schedule);
});

// Update an existing schedule
export const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedSchedule = await Schedule.findByIdAndUpdate(id, updates, { new: true });
  
  if (!updatedSchedule) {
    return res.status(404).json({ message: 'Schedule not found' });
  }
  
  res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
});

// Delete a schedule
export const deleteSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedSchedule = await Schedule.findByIdAndDelete(id);
  
  if (!deletedSchedule) {
    return res.status(404).json({ message: 'Schedule not found' });
  }
  
  res.status(200).json({ message: 'Schedule deleted successfully' });
});
