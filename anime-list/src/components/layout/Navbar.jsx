import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    return(
        <div className="nav nav-unscoped" data-nav>
            <div className="wrap guess" data-nav>
                <a href="/" className="logo link-active">LOGO</a>
                <div className="links" data-nav>
                    <span className="browse-wrap" data-nav>
                        <Link to="/search" className="Link" data-nav>Search</Link>
                        <div className="dropdown" data-nav>
                            <div className="primary-links" data-nav>
                                <div className="primary-link">
                                    <svg data-nav aria-hidden focusable={false} dataPrefix="fas" dataIcon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="icon svg-inline--fa fa-play fa-w-14"></svg>
                                </div>
                            </div>
                            <div className="footers" data-nav>
                                <a href="/">a</a>
                                <a href="/">b</a>
                                <a href="/">c</a>
                                <a href="/">d</a>
                            </div>
                        </div>
                    </span>
                    <Link to="/social" className="link" data-nav>Social</Link>
                    <Link to="/forum" className="link" data-nav>Forum</Link>
                    <Link to="/login" className="link login" data-nav>Login</Link>
                    <Link to="/signup" className="link signup" data-nav>Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;