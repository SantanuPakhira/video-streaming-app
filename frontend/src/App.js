import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

import Upload from "./components/Upload";


function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/delete/${id}`);
      setVideos(videos.filter(video => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🎮 Video Streaming App </h1>
          <h3>Developed by Santanu Pakhira</h3>
          
          {/* Navigation Buttons */}
          <div className="nav-buttons">
            <Link to="/" className="btn btn-primary">🏠 Home</Link>
            <Link to="/login" className="btn btn-success">🔑 Login</Link>
            <Link to="/register" className="btn btn-danger">🔑 Register</Link>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home videos={videos} onDelete={deleteVideo} />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;




