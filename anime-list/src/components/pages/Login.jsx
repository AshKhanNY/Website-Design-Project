import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {

    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage)
                }
            );
        } else {
            setLoading(false);
        }
    };

    return(
        <div className="page-content">
            <div className="auth-form-unscoped">
                <div className="form container">
                    <div className="title">Login</div>
                    <Form onSubmit={handleLogin} ref={form}>
                        <Input 
                            placeholder="Email" 
                            className="al-input" 
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            className="al-input"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]} 

                        />
                        <button className="submit">
                            {loading &&(
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            Login
                        </button>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none "}} ref={checkBtn} />
                    </Form>
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