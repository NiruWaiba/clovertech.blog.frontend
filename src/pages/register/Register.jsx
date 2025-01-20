import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axiosInstance from "../../api/axios";

const Register = () => {
  // State variables for form inputs and error handling
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    // Validate inputs
    if (!username || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      // Make a POST request to the registration API
      const res = await axiosInstance.post("/api/Auth/Register", {
        username,
        email,
        password,
      });

       // Redirect user if registration is successful
        if (res.data && res.data.isSuccess) {
          console.log("Registration successful:", res.data);
          window.location.replace("/login");
        } else {
          console.error("Failed response:", res.data.errors);
          setError("Registration failed. Please try again.");
        }
      } catch (err) {
        // Parse backend error response
        const errors = err.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
          // Find specific error (e.g., EmailAlreadyExists)
          const emailError = errors.find((error) => error.code === "EmailAlreadyExists");
          if (emailError) {
            setError(emailError.description); // Display "Email is already registered."
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        console.error("Registration error:", err.response?.data || err.message);
      }
    };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        {/* Username Input */}
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Email Input */}
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button className="registerrButton" type="submit">
          Register
        </button>
      </form>
      {/* Error Message */}
      {error && <span className="error">{error}</span>}
      {/* Link to Login Page */}
      <div className="register-link">
        Before login, Register here! <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;


