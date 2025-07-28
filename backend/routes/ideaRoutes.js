const express = require('express');
const router = express.Router();
const multer = require('multer');
const Idea = require('../models/Idea');

// Use memory storage to keep files in RAM
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST /api/ideas/submit - Save idea + document in DB
router.post('/submit', upload.single('ideaDocument'), async (req, res) => {
  try {
    const { title, description, founder, email } = req.body;

    const newIdea = new Idea({
      title,
      description,
      founder,
      email,
      ideaDocument: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            originalName: req.file.originalname
          }
        : null
    });

    await newIdea.save();
    res.status(201).json({ message: '✅ Idea submitted successfully' });
  } catch (error) {
    console.error('❌ Error submitting idea:', error.message);
    res.status(500).json({ message: 'Failed to submit idea' });
  }
});

// ✅ GET /api/ideas - Fetch all ideas (excluding document data)
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find({}, { ideaDocument: 0 }); // Don't send file buffer
    res.status(200).json(ideas);
  } catch (err) {
    console.error('❌ Fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch ideas' });
  }
});

// ✅ GET /api/ideas/download/:id - Download file
router.get('/download/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea || !idea.ideaDocument || !idea.ideaDocument.data) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.set('Content-Type', idea.ideaDocument.contentType);
    res.set(
      'Content-Disposition',
      `attachment; filename="${idea.ideaDocument.originalName || 'document'}"`
    );
    res.send(idea.ideaDocument.data);
  } catch (err) {
    console.error('❌ Download error:', err.message);
    res.status(500).json({ message: 'Failed to download document' });
  }
});

module.exports = router;
