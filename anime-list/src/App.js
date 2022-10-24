import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Anime from './components/pages/Anime';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={ <Home /> } />
        <Route path='/anime' element={ <Anime /> } />
      </Routes>
    </Router>
  );
}

export default App;
