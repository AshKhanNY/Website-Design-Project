import React, { useState, useEffect } from 'react';
import './App.css';

import AuthService from "./components/services/auth.service";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';

import Home from "./components/pages/Home";
import Anime from "./components/pages/Anime";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logOut();
  };

  let props = {
    showModeratorBoard: showModeratorBoard,
    showAdminBoard: showAdminBoard,
    currentUser: currentUser
  }
  return (
    <Router>
      <Navbar {...props} />
      <Routes>
        <Route path='/' exact element={ <Home /> } />
        <Route path='/anime' element={ <Anime /> } />
        <Route path='/login' element={ <Login /> }/>
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/profile' element={ <Profile /> } />
      </Routes>
    </Router>
  );
}

export default App;
