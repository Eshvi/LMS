import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_url from './API_url';

export default function Register() {
    // State to hold form input values
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(null);
    const [passErr, setPassErr] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(emailValue);
        if (emailRegex.test(emailValue)) {
            setError(null);
        } else {
            setError('Invalid email address');
        }
    };

    const handlePassword = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        if (passwordValue.length <= 8) {
            setPassErr('Password length must be more than 8 characters');
        } else {
            setPassErr(null);
        }
    };

    // Handle the form submission
    const signup = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Validate fields before submission
        if (!username) {
            setFormError("Please fill out the username.");
            return;
        }
        if (nameError || error || passErr) {
            setFormError("Please correct the errors before submitting.");
            return;
        }
        if (!email || !password || !confirmPassword || !contact) {
            setFormError("Please fill out all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(API_url.user.Register, { email, username, password, contact });
            console.log(response);

            setFormError(null); // Clear any previous errors
            alert(response.data.message);
            navigate('/');
        } catch (err) {
            console.log(err);
            setFormError(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <>
            <div id='bg'>
                <form className="form" onSubmit={signup}>
                   
                    <div className="flex-column">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputForm">
                        <input
                        required
                            placeholder="Enter your Email"
                            className="input"
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    {error && <span className='text-danger' style={{fontSize:'18px'}}>{error}</span>}

                    <div className="flex-column">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="inputForm">
                        <input
                        required
                            placeholder="Enter your Password"
                            className="input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                    {passErr && <span className='text-danger' style={{fontSize:'18px'}}>{passErr}</span>}

                    <div className="flex-column">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div className="inputForm">
                        <input
                        required
                            placeholder="Enter your Password Again"
                            className="input"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex-column">
                        <label htmlFor="contact">Contact</label>
                    </div>
                    <div className="inputForm">
                        <input
                            placeholder="Enter your Contact"
                            className="input"
                            type="text"
                            id="contact"
                            required
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>

                    <div className="flex-row">
                        <div>
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <span className="span">Forgot password?</span>
                    </div>
                    <button type="submit" className="button-submit">
                        Sign Up
                    </button>
                    <p className="p">
                        Already have an account? <Link to={'/'} className="span">Sign In</Link>
                    </p>
                </form>

                {/* Display form error */}
                {formError && <div className="error-message">{formError}</div>}
            </div>
        </>
    );
}
