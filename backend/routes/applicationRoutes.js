const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/manual-apply", async (req, res) => {
  try {
    console.log("📩 Received form data:", req.body);

    const { name, registration, email, mobile, eventId } = req.body;

    if (!name || !registration || !email || !mobile || !eventId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const exists = await Application.findOne({ email, eventId });
    if (exists) {
      return res.status(400).json({ message: "Already applied for this event." });
    }

    const newApplication = new Application({
      name, registration, email, mobile, eventId
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted!" });

  } catch (error) {
    console.error("❌ Manual Apply Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/all", async (req, res) => {
  try {
    const applications = await Application.find().populate("eventId", "title date");
    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Fetch Applications Error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});


module.exports = router;
