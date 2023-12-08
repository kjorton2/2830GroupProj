import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Handle Login function called');

    try {
      // Send login data to the backend
      const response = await axios.post('http://localhost:5000/api/login', formData);

      // Handle the response (optional)
      console.log(response.data);

      // Reset the form
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
    };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;