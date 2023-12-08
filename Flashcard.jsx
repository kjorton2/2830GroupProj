import React, { useState } from 'react';
import axios from 'axios';

const Flashcard = () => {
  const [flashcardData, setFlashcardData] = useState({
    verse: '',
    verseContent: '',
  });

  const handleInputChange = (e) => {
    setFlashcardData({
      ...flashcardData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to save the flashcard information to the server
      const response = await axios.post('http://localhost:5000/api/save-flashcard', flashcardData);

      // Handle success (optional)
      console.log(response.data);

      // Reset the form
      setFlashcardData({
        verse: '',
        verseContent: '',
      });
    } catch (error) {
      // Handle error
      console.error('Saving flashcard failed:', error);
    }
  };

  return (
    <div>
      <h2>Create Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <label>Bible Verse:</label>
        <input type="text" name="verse" value={flashcardData.verse} onChange={handleInputChange} />

        <label>Answer:</label>
        <input type="text" name="verseContent" value={flashcardData.verseContent} onChange={handleInputChange} />

        <button type="submit">Save Flashcard</button>
      </form>
    </div>
  );
};

export default Flashcard;