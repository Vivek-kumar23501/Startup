// routes/galleryRoutes.js
const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");

// POST /api/institute/gallery
router.post("/gallery", async (req, res) => {
  try {
    const { image, caption } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newPhoto = new Gallery({ image, caption });
    await newPhoto.save();

    res.status(201).json({ message: "Photo uploaded", photo: newPhoto });
  } catch (error) {
    console.error("❌ Upload error:", error.message);
    res.status(500).json({ error: "Failed to upload photo" });
  }
});

// GET /api/institute/gallery
router.get("/gallery", async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 });

    // Add base64 prefix if missing
    const processedPhotos = photos.map((photo) => ({
      ...photo._doc,
      image: photo.image.startsWith("data:image")
        ? photo.image
        : `data:image/jpeg;base64,${photo.image}`,
    }));

    res.json(processedPhotos);
  } catch (error) {
    console.error("❌ Error fetching gallery:", error.message);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

module.exports = router;
