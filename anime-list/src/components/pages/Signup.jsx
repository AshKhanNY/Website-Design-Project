import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return(
        <div className="page-content">
            <div className="auth-form-unscoped">
                <div className="form container">
                    <div className="title">Signup to "Name of the site" </div>
                    <form>
                        <input placeHolder="Email" className="al-input"></input>
                        <input placeHolder="Username" className="al-input"></input>
                        <input type="password" placeHolder="Password" className="al-input"></input>
                        <input type="password" placeHolder="Confirm password" className="al-input"></input>
                        <div className="submit">Login</div>
                    </form>
                    <Link to="/login" className="link signup-2">
                        Already have an account??
                        <span> Log in</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;