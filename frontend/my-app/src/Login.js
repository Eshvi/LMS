import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_url from './API_url.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle sign in
    const signIn = async (e) => {
        e.preventDefault();

        // Basic validation to ensure email and password are not empty
        if (!email || !password) {
            setError('Please fill in all fields');
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please fill in all fields',
            });
            return;
        }

        try {
            const response = await axios.post(API_url.user.login, { email, password });
            console.log(response.data.user);
            sessionStorage.setItem("user", JSON.stringify(response.data.user))
            // Clear any previous errors
            setError(null);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: response.data.message,
            });
            navigate('/product');
        } catch (err) {
            console.log(err);
            // Specific error handling for email and password
            if (err.response && err.response.status === 401) {
                if (err.response.data.error === 'Invalid email') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Email',
                        text: 'The email address you entered is not registered.',
                    });
                } else if (err.response.data.error === 'Wrong password') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Wrong Password',
                        text: 'The password you entered is incorrect.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'Please check your credentials and try again.',
                    });
                }
            } else {
                setError('Login failed. Please check your credentials and try again.');
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'An unexpected error occurred. Please try again later.',
                });
            }
        }
    };

    return (
        <>
            <div className='bg-dark' style={{ border: "1px solid" }}>
                <form className="form" onSubmit={signIn}>
                    <div className="flex-column">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputForm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            viewBox="0 0 32 32"
                            height="20"
                        >
                            <g data-name="Layer 3" id="Layer_3">
                                <path
                                    d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"
                                ></path>
                            </g>
                        </svg>
                        <input
                            placeholder="Enter your Email"
                            className="input"
                            required
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex-column">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="inputForm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            viewBox="-64 0 512 512"
                            height="20"
                        >
                            <path
                                d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"
                            ></path>
                            <path
                                d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"
                            ></path>
                        </svg>
                        <input
                            placeholder="Enter your Password"
                            className="input"
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        Sign In
                    </button>
                    <p className="p">
                        Don't have an account? <Link to={'/signUp'} className="span">Sign Up</Link>
                    </p>
                </form>
                {/* Display error message */}
                {error && <div className="error-message">{error}</div>}
            </div>
        </>
    );
}
