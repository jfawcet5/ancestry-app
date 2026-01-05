//import React, {useEffect, useState} from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import './styles/theme.css' 

import Navbar from './shared/components/Navbar.js';

import PageLayout from './shared/components/pageLayout.js';

import HomePage from './pages/homePage.js';
import ViewPersonPage from './features/person/ViewPersonPage/index.js';
import CreatePersonPage from './features/person/CreatePersonPage/index.js';
import SearchPersonPage from './features/person/SearchPersonPage/index.js';
import ViewTreePage from './features/tree/ViewTreePage/index.js';
import LoginPage from './pages/loginPage.js';
import RegisterPage from './pages/registerPage.js';

import background from "./assets/background2.png";

//const ENDPOINT = process.env.REACT_APP_API_URL;

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <img src={background} className='background' alt="logo"/>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/ancestry-app" element={<HomePage />}/>
            <Route path="/search" element={<SearchPersonPage />}/>
            <Route path="/people/:id" element={<ViewPersonPage />}/>
            <Route path="/create" element={<CreatePersonPage />}/>
            <Route path="/treeview" element={<ViewTreePage />}/>
            <Route path="/treeview/:id" element={<ViewTreePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
          </Routes>
        </PageLayout>
      </Router>
    </>
  );
}

export default App;


/*
      <PopupModal label="Loading..." isOpen={true} size="narrow">
        <br />
        <div className="loader-spinner"/>
        <p>Test Loader</p>
      </PopupModal> 
*/