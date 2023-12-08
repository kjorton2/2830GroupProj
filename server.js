const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyParser.json());

// User model
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
});

const corsOption = {
  origin: 'http://localhost:3000', // Frontend's URL
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOption));

mongoose.connect("mongodb+srv://anyone:anyone123@finalmongo.muawtu7.mongodb.net/Test?retryWrites=true&w=majority", {
}).then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Registration route
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Create a new user
      const newUser = new User({ name, email, password });
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      // Send a success response
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      })
      
      
    } catch (error) {
      // Handle registration failure
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If the user is not found, send an error response
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If the passwords do not match, send an error response
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Send a success response
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      // Handle login failure
      console.error('Login error:', error);
  
      // Send an error response
      res.status(500).json({ error: 'Login failed' });
    }
});



app.post('/api/save-flashcard', async (req, res) => {
    const { verse, verseContent } = req.body;
  
    try {
      // Save flashcard information to the database
      const userId = req.user._id; 
      const user = await User.findById(userId);
      user.flashcards.push({ verse, verseContent });
      await user.save();
  
      
      res.status(200).json({ message: 'Flashcard saved successfully' });
    } catch (error) {
      // Handle error
      console.error('Saving flashcard failed:', error);
      res.status(500).json({ error: 'Saving flashcard failed' });
    }
});


app.get('/', (req, res) => {
  res.send('Hello from the backend');
});

app.get('/api/register', (req, res) => {
  res.send('register api');
});

app.get('/api/save-flashcard', (req, res) => {
  res.send('flashcard api');
});

app.get('/api/login', (req, res) => {
  res.send('login api');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});