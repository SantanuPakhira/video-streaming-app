const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  uploadedAt: { type: Date, default: Date.now }
});

// Fix: Prevent Overwriting the Model
const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

module.exports = Video;