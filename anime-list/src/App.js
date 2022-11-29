import React, { useState, useEffect } from 'react';
import './App.css';

import AuthService from "./components/services/auth.service";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';

import Home from "./components/pages/Home";
import Anime from "./components/pages/Anime";
import MyAnime from "./components/pages/MyAnime"
import Movie from "./components/pages/Movie";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import AnimeList from "./components/pages/AnimeList";
import MyAnimeList from "./components/pages/MyAnimeList";
import AddAnime from "./components/pages/AddAnime";
import AddMyAnime from "./components/pages/AddMyAnime";
import Footer from "./components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  AuthService.register("admin", "admin@hotmail.com", "12345678",["user", "admin"]);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [scrollDir, setScrollDir] = useState(false);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;
  
    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
  
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? true : false);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };
  
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", onScroll);
    console.log(scrollDir);
  
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

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
    currentUser: currentUser,
    scrolDir: scrollDir
  }
  return (
      <Router>
        <Navbar {...props} />
        <div className="page-content">
          <Routes>
            <Route path='/' exact element={ <Home /> } />
            <Route path='/animes/:id' element={ <Anime /> } />
            <Route path='/my-animes/:id' element={ <MyAnime /> } />
            <Route path='/movies/:id' element={ <Movie /> } />
            <Route path='/login' element={ <Login /> }/>
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/my-list' element={ <AnimeList /> } />
            <Route path='/myplist/:id' element={ <MyAnimeList /> } />
            <Route path='/add-anime' element={ <AddAnime /> } />
            <Route path='/addplist/' element={ <AddMyAnime />} />
          </Routes>
         </div> 
        <Footer />
      </Router>
  );
}

export default App;
