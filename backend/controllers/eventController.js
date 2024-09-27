import Event from '../models/eventModel.js'

export const createEvent = async (req, res) => {
  const { eventName, description, date, startTime, endTime, location } =
    req.body
  try {
    const newEvent = new Event({
      eventName,
      description,
      date,
      startTime,
      endTime,
      location,
      createdBy: req.user._id,
    })
    await newEvent.save()
    res
      .status(201)
      .json({ message: 'Event created successfully', event: newEvent })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getEventDetails = async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.findById(id).populate('createdBy')
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateEvent = async (req, res) => {
  const { id } = req.params
  const updates = req.body

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
    })
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res
      .status(200)
      .json({ message: 'Event updated successfully', event: updatedEvent })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteEvent = async (req, res) => {
  const { id } = req.params

  try {
    const deletedEvent = await Event.findByIdAndDelete(id)
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.status(200).json({ message: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getEventsByUser = async (req, res) => {
  const { userId } = req.params
  try {
    const events = await Event.find({ participants: userId })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
