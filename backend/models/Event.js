const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  coordinator: String,
  appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // ✅ Applied user references
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
