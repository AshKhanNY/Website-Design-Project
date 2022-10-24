import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <div>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/anime">Anime</Link>
            </li>
        </div>
    );
}

export default Navbar;