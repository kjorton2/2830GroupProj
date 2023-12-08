import React, { useState } from 'react';
import axios from 'axios';

// function createAccount() {
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;

//     localStorage.setItem('account');

//     alert('Account Created');
// }

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to the backend
      const response = await axios.post('http://localhost:5000/api/register', formData);

      // Handle the response (optional)
      console.log(response.data);

      // Reset the form
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;