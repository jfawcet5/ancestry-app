import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar.js';

import HomePage from './pages/homePage.js';
import SearchPage from './pages/searchPage.js';
import PersonForm from "./pages/addPersonPage.js";
import ViewPersonPage from './pages/viewPersonPage.js';

const ENDPOINT = process.env.REACT_APP_API_URL;

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/people/:id" element={<ViewPersonPage />}/>
          <Route path="/create" element={<PersonForm />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
