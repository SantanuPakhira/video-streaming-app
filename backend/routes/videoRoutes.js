const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Video = require('../models/video');

const router = express.Router();

// Multer Storage Config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload video route
router.post("/", upload.single("video"), async (req, res) => {
  try {
    const newVideo = new Video({
      title: req.body.title,
      videoUrl: req.file.filename,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Error uploading video" });
  }
});

// DELETE a video by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Remove file from uploads folder
        const filePath = path.join(__dirname, "../uploads/", video.videoUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
        }

        await Video.findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error("Error deleting video:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
