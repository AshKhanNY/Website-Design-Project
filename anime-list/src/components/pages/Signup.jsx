import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value){
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if(!isEmail(value)){
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if(value.length < 3 || value.length > 20){
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if(value.length < 8 || value.length > 40){
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 40 characters.
            </div>
        );
    }
};

const Signup = () => {

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return(
        <div className="page-content">
            <div className="auth-form-unscoped">
                <div className="form container">
                    <div className="title">Signup to "Name of the site" </div>
                    <Form onSubmit={handleRegister} ref={form}>
                        {!successful && (
                            <div>
                                <Input 
                                    placeholder="username" 
                                    className="al-input"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]} 
                                />

                                <Input 
                                    placeholder="Email" 
                                    className="al-input"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]} 
                                />

                                <Input 
                                    placeholder="password"
                                    type="password" 
                                    className="al-input"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]} 
                                />
                                <button className="submit">Sign up</button>
                            </div>
                        )}

                        {message && (
                            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                {message}
                            </div>
                        )}
                        <CheckButton style={{ display: "none"}} ref={checkBtn} />
                    </Form>
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