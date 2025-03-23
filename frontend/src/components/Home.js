import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching video data:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', file);

    axios.post('http://localhost:5000/api/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        alert('Video uploaded successfully');
        setFile(null);
      })
      .catch(error => {
        console.error('Error uploading video:', error);
      });
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
      </div>

      {/* Display Videos */}
      <div className="row">
        {videos.length > 0 ? videos.map((video) => (
          <div key={video._id} className="col-md-4">
            <div className="card">
              <img src={`http://localhost:5000/uploads/${video.thumbnailUrl}`} className="card-img-top" alt={video.title} />
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <Link to={`/video/${video._id}`} className="btn btn-primary">▶ Watch</Link>
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
