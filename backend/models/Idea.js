const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: String,
  description: String,
  founder: String,
  email: String,
  ideaDocument: {
    data: Buffer,
    contentType: String,
    originalName: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Idea', ideaSchema);
