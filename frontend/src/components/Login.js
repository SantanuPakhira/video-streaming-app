import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/api/login', { email, password })
      .then(response => {
        alert('Login successful!');  // Later, redirect or store token
        setError('');
      })
      .catch(error => {
        console.error('Login failed:', error);
        setError('Invalid email or password. Please try again.');
      });
  };

  return (
    <div className="container mt-2">
      <h3>🔑 User Login</h3>
      
      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>

      {/* Back to Home Button */}
      <Link to="/" className="btn btn-secondary mt-3">🏠 Back to Home</Link>
      <p>Don't have an account? <a href="/register">Sign up</a></p>
    </div>
  );
};

export default Login;
