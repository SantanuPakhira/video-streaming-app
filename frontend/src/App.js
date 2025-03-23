import { Link } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🎬 Video Streaming App </h1>
          <h3>Developed by Santanu Pakhira</h3>
          
          {/* Navigation Buttons */}
          <div className="nav-buttons">
            <Link to="/" className="btn btn-primary">🏠 Home</Link>
            <Link to="/login" className="btn btn-secondary">🔑 Login</Link>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
