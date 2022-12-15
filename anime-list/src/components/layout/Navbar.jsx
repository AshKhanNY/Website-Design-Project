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
                <a href="/" className="logo link-active"><img src="/logo.png" width={100} height={80}/></a>
                <div className="links" data-nav>
                    <span className="browse-wrap" data-nav>
                        <Link to="/" className="link" data-nav>Search</Link>
                        <div className="dropdown" data-nav>
                            <div className="primary-links" data-nav>
                                <div className="primary-link" data-nav>
                                    <i className="play icon"></i>
                                    <section className="l-section">
                                        <a href="/" className="primary-link-text" data-nav>Anime</a>
                                        <div className="secondary-links" data-nav>
                                            <a href="/" className="primary-link-text disabled" data-nav>Top animes</a>
                                        </div>
                                    </section>
                                </div>
                                <div className="primary-link" data-nav>
                                    <i className="caret square right icon"></i>
                                    <section className="l-section">
                                        <a href="/allmovies" className="primary-link-text" data-nav>Movies</a>
                                        <div className="secondary-links" data-nav>
                                            <a href="/" className="primary-link-text disabled" data-nav>Top movies</a>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="footers" data-nav>
                                <a href="/" className="primary-link-text disabled" data-nav>MediaList</a>
                            </div>
                        </div>
                    </span>
                    {props.currentUser ? (
                        <>
                            <Link to={ "/myplist/" + user.id } className="link" data-nav>My list</Link>
                            <Link to="/addplist" className="link" data-nav>Add to list</Link>
                            <Link to="/my-list" className="link" data-nav>Global list</Link>
                            {props.showAdminBoard ? (
                                <>
                                <Link to="/add-anime" className="link" data-nav>Add to global list</Link>
                                </>
                            ):(
                                <>
                                </>
                            ) }

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