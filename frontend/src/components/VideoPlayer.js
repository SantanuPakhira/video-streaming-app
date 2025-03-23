import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/videos/${id}`)
      .then(response => {
        setVideo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching video:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mt-5 text-center">
      {loading ? (
        <h2>Loading video...</h2>
      ) : video ? (
        <div>
          <h1>{video.title}</h1>
          
          <div className="video-container mt-4">
            <video controls width="70%">
              <source src={`http://localhost:5000/uploads/${video.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="mt-3">{video.description}</p>

          {/* Back to Home Button */}
          <Link to="/" className="btn btn-secondary mt-3">🏠 Back to Home</Link>
        </div>
      ) : (
        <h2>❌ Video not found!</h2>
      )}
    </div>
  );
};

export default VideoPlayer;

