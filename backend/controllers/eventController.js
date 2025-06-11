import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, budget } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      budget,
      organizer: req.user._id,
    });

    const saved = await event.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc Get events created by the logged-in organizer
// @route GET /api/events/myevents
// @access Private
export const getMyEvents = async (req, res) => {
    try {
      const events = await Event.find({ organizer: req.user._id });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// @desc Delete an event
// @route DELETE /api/events/:id
// @access Private
export const deleteEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
  
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      await event.deleteOne();
      res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // @desc Update an event
  // @route PUT /api/events/:id
  // @access Private
  export const updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
  
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      const { title, description, date, location, budget } = req.body;
      event.title = title;
      event.description = description;
      event.date = date;
      event.location = location;
      event.budget = budget;
  
      const updated = await event.save();
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
