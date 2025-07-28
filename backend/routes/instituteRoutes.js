const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // ✅ Event model
const User = require('../models/User');   // ✅ Required to populate user data (name/email)

// ✅ POST: Create new event
router.post('/create-event', async (req, res) => {
  try {
    const { title, description, date, time, location, coordinator } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      coordinator,
      appliedUsers: [] // ✅ Initialize with empty array
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    console.error('❌ Error saving event:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ GET: Fetch all events (with applicant info)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate('appliedUsers', 'name email'); // ✅ Populate user details (optional)

    res.status(200).json(events);
  } catch (err) {
    console.error('❌ Error fetching events:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ POST: User applies to an event
router.post('/events/:eventId/apply', async (req, res) => {
  try {
    const { userId } = req.body;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // ✅ Prevent duplicate applications
    if (event.appliedUsers.includes(userId)) {
      return res.status(400).json({ message: 'User already applied to this event' });
    }

    event.appliedUsers.push(userId);
    await event.save();

    res.status(200).json({ message: 'Successfully applied to event' });
  } catch (err) {
    console.error('❌ Apply error:', err.message);
    res.status(500).json({ message: 'Failed to apply to event' });
  }
});
// DELETE /api/institute/events/:id
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ Delete event error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
