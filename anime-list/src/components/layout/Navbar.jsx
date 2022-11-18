import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthService from '../services/auth.service';

const Navbar = (props) =>{
    let navigate =useNavigate();
    const user = AuthService.getCurrentUser();

    const logOut = () => {
        AuthService.logout();
        navigate("/login")
        window.location.reload();
    };

    const transStyle = {
        transition: "background 0.8s ease 0s, top 0.5s ease 0s"
      };

    return(
        <div className={props.scrolDir? "nav nav-unscoped hidden" : "nav nav-unscoped" } style={transStyle} data-nav>
            <div className="wrap guess" data-nav>
                <a href="/" className="logo link-active">LOGO</a>
                <div className="links" data-nav>
                    <span className="browse-wrap" data-nav>
                        <Link to="/search" className="link" data-nav>Search</Link>
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
                    {props.currentUser ? (
                        <>
                            <Link to={ "/myplist/" + user.id } className="link" data-nav>plist</Link>
                            <Link to="/addplist" className="link" data-nav>Add to plist</Link>
                            <Link to="/my-list" className="link" data-nav>My list</Link>
                            <Link to="/add-anime" className="link" data-nav>Add to list</Link>
                            <Link to="/social" className="link" data-nav>Social</Link>
                            <Link to="/forum" className="link" data-nav>Forum</Link>
                            <Link to="/profile" className= "link login" data-nav>{props.currentUser.username}</Link>
                            <Link to="/login" className="link signup" data-nav onClick={logOut}>Log out</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="link login" data-nav>Login</Link>
                            <Link to="/signup" className="link signup" data-nav>Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;