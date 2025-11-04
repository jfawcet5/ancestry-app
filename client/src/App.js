import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navbar from './shared/components/Navbar.js';

import PageLayout from './shared/components/pageLayout.js';

import HomePage from './pages/homePage.js';
import SearchPage from './pages/searchPage.js';
import ViewPersonPage from './features/person/ViewPersonPage/index.js';
import CreatePersonPage from './features/person/CreatePersonPage/index.js';
import SearchPersonPage from './features/person/SearchPersonPage/index.js';
import ViewTreePage from './features/tree/ViewTreePage/index.js';

const ENDPOINT = process.env.REACT_APP_API_URL;

function App() {
  return (
    <Router>
      <Navbar />
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/search" element={<SearchPersonPage />}/>
          <Route path="/people/:id" element={<ViewPersonPage />}/>
          <Route path="/create" element={<CreatePersonPage />}/>
          <Route path="/treeview" element={<ViewTreePage />}/>
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
