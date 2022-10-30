import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Anime from './components/pages/Anime';
import Login from './components/pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={ <Home /> } />
        <Route path='/anime' element={ <Anime /> } />
        <Route path='/login' element={ <Login /> }/>
      </Routes>
    </Router>
  );
}

export default App;
