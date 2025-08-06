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
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(morgan("dev"));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Static Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Route Imports
const authRoutes = require("./routes/auth");
const instituteRoutes = require("./routes/instituteRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/institute", instituteRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/institute", noticeRoutes);
app.use("/api/institute", galleryRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("🚀 Startup backend is running");
});

// ✅ Fallback Route
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// ✅ Graceful Shutdown
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("🛑 MongoDB disconnected on app termination");
  process.exit(0);
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
