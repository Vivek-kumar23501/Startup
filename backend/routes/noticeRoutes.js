// routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// POST /api/institute/notice
router.post('/notice', async (req, res) => {
  try {
    const { title, description, date, place } = req.body;

    if (!title || !description || !date || !place) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newNotice = new Notice({ title, description, date, place });
    await newNotice.save();

    res.status(201).json({ message: 'Notice created successfully', notice: newNotice });
  } catch (error) {
    console.error('❌ Error saving notice:', error.message);
    res.status(500).json({ error: 'Server error while creating notice' });
  }
});
// routes/noticeRoutes.js
router.get('/notices', async (req, res) => {
  try {
    const allNotices = await Notice.find().sort({ createdAt: -1 });
    res.json(allNotices);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching notices' });
  }
});
router.delete('/notices/:id', async (req, res) => {
  try {
    const deleted = await Notice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting notice' });
  }
});
router.get('/notices', async (req, res) => {
  try {
    const allNotices = await Notice.find().sort({ createdAt: -1 });
    res.json(allNotices);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching notices' });
  }
});



module.exports = router;
