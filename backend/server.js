const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true
}));
app.use(express.json({ limit: "10mb" })); // for base64 image data
app.use(helmet());
app.use(morgan("dev"));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Static folder (if needed in other cases)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Route Imports
const authRoutes = require("./routes/auth");
const instituteRoutes = require("./routes/instituteRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const galleryRoutes = require("./routes/galleryRoutes"); // ✅ NEW gallery route

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/institute", instituteRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/institute", noticeRoutes);
app.use("/api/institute", galleryRoutes); // ✅ New route for photo upload

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Startup backend is running");
});

// ✅ Handle 404
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// ✅ Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("🛑 MongoDB disconnected on app termination");
  process.exit(0);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
