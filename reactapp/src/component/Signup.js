import React, { useState } from 'react';
import { signup } from '../utils/api';
import './signup.css'; 

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await signup(formData);
      setMessage('User registered successfully!');
    } catch (err) {
      let errorText = '';

      // Handle API response text
      if (err.response && err.response.data) {
        errorText = typeof err.response.data === 'string'
          ? err.response.data
          : JSON.stringify(err.response.data);
      } else if (err.message) {
        errorText = err.message;
      } else {
        errorText = 'Registration failed. Try again.';
      }

      // Simplify message if it's a duplicate entry
      if (errorText.includes('Duplicate entry')) {
        setError('Duplicate entry: Username or email already exists.');
      } else if (errorText.includes('User already exists')) {
        setError('User already exists with this email.');
      } else {
        setError(errorText);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
