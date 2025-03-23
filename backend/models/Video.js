const mongoose = require('mongoose');

// Define the video schema
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const Video = mongoose.model('Video', videoSchema);

// Export the model for use in other files
module.exports = Video;
