const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Video = require("./models/Video");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Failed", err));

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
  const { title, description, videoUrl, thumbnailUrl } = req.body; // Extract video details from the request body
  try {
    const newVideo = new Video({ title, description, videoUrl, thumbnailUrl }); // Create a new Video object
    await newVideo.save(); // Save it to the database
    res.status(201).json(newVideo); // Return the newly created video as a JSON response
  } catch (err) {
    res.status(500).json({ message: "Error adding video" }); // Error handling
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Video Streaming App Backend!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
