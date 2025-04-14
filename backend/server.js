const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const Video = require('./models/video');

dotenv.config();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve video files

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Video Streaming App Backend!");
});

// Get all videos
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all videos from the database
    res.json(videos); // Send videos as a JSON response
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching videos" });
  }
});

// Route to add a new video
app.post("/api/videos", async (req, res) => {
  const { title, description, videoUrl, thumbnailUrl } = req.body;
  try {
    const newVideo = new Video({ title, description, videoUrl, thumbnailUrl });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Error adding video" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
