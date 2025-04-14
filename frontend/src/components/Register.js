import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", formData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-2">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control border p-2 mt-2 rounded bg-light" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" className="form-control border p-2 mt-2 rounded bg-light" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" className="form-control border p-2 mt-2 rounded bg-light" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" className="form-control border p-2 mt-2 rounded bg-light" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" className="form-control border p-2 mt-2 rounded bg-light" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit " className="btn btn-success mt-2"> Now You are Authorised baby </button>
      </form>
    </div>
  );
};

export default Register;


console.log("Register Page Loaded");