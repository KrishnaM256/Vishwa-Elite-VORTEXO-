import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  subject: { type: String, required: true },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  day: { type: String, required: true },
  location: { type: String, required: true },
})

const Schedule = mongoose.model('Schedule', scheduleSchema)
export default Schedule
