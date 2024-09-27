import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: String, required: true }, // e.g., "09:00 AM - 10:00 AM"
  day: { type: String, required: true }, // e.g., "Monday"
  location: { type: String, required: true } // e.g., "Room 101"
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
