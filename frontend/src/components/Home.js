import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch videos from the backend
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    axios.get('http://localhost:5000/api/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select a video file first.");
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:5000/api/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      alert('✅ Video uploaded successfully!');
      setFile(null);
      setUploadProgress(0);
      fetchVideos(); // Refresh video list
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('❌ Video upload failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/delete/${id}`);
      setVideos(videos.filter(video => video._id !== id)); // Update state
      alert('✅ Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('❌ Failed to delete the video.');
    }
  };

  return (
    <div className="container">
      <h1>🎥 Video Gallery</h1>

      {/* Upload Section */}
      <div className="upload-section">
        <h2>📤 Upload a New Video</h2>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleFileChange} className="form-control" />
          <button type="submit" className="btn btn-success mt-3">Upload Video</button>
        </form>

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="progress mt-3">
            <div 
              className="progress-bar progress-bar-striped bg-info" 
              role="progressbar" 
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}
      </div>

      {/* Display Videos */}
      <div className="row mt-4">
        {videos.length > 0 ? videos.map((video) => (
          <div key={video._id} className="col-md-4">
            <div className="card">
              <video width="100%" height="200" controls>
                <source src={`http://localhost:5000/uploads/${video.videoUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <Link to={`/video/${video._id}`} className="btn btn-primary">▶ Watch</Link>
                <button onClick={() => handleDelete(video._id)} className="btn btn-danger ms-2">🗑 Delete</button>
              </div>
            </div>
          </div>
        )) : (
          <p>No videos available. Upload some videos!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
