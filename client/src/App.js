import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const ENDPOINT = process.env.REACT_APP_API_URL;

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(`Fetching: ${ENDPOINT}\\api\\hello`);
    fetch(`${ENDPOINT}\\api\\hello`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Failed to fetch:", err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message || "Loading message..."}</p> {/* Show the fetched message */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
