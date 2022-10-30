import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <div className="page-content">
            <div className="auth-form-unscoped">
                <div className="form container">
                    <div className="title">Login</div>
                    <form>
                        <input placeHolder="Email" className="al-input"></input>
                        <input type="password" placeHolder="Password" className="al-input"></input>
                        <div className="submit">Login</div>
                    </form>
                    <Link to="/forgot" className="link"> Forgot password?</Link>
                    <Link to="/signup" className="link signup-2">
                        Not registered?
                        <span> Create an account</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;