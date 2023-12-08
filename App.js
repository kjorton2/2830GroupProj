import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Flashcard from './Components/Flashcard';
import Header from './Components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000').then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <Router>
          <Header />
                <div>
                    <Routes>
                        <Route exact path='/' element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/flashcard" element={<Flashcard/>}/>
                    </Routes>
                </div>
      </Router>
    </div>
  );
}

export default App;

