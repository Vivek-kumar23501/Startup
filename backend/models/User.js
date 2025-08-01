// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String },
  registrationNumber: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "institute", "user"], default: "user" },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
