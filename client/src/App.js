import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import PersonForm from "./pages/addPersonPage.js";

const ENDPOINT = process.env.REACT_APP_API_URL;

function App() {
  return (
    <div className="App">
      <PersonForm />
    </div>
  );
}

export default App;
