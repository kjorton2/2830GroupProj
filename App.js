import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Flashcard from './Components/Flashcard';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000').then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <h1>MERN Stack Example</h1>
      <Register />
      <Login />
      <Flashcard />
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     {data}

    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

