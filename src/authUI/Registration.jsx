import React, { useEffect, useState } from 'react';
import './authUI.css';
import api from '../auth/auth'
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(password.length<4 )
            setPasswordError(true);
        else{
            setPasswordError(false);
            try {
                const result = api.registration({ "username": username, "password": password })
                result.then(result => {
                    setLoading(false)
                    setError(false)
                    navigate("/login")
                })
                    .catch(error => {
                        console.log(error)
                        setLoading(false)
                        setError(true)
                    })
            } catch (e) {
                console.log(e)
            }
        }

    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-white">
                        <div className="card-header">
                            <h4>Register</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        name='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    {error && <span className="text-danger">user name already exists</span>}
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name='password'
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim());
                                        }}
                                        required
                                    />
                                    {passwordError&& <span className="text-danger">password must be at least 4 characters</span>}
                                </div>
                                <div className="justify-content-between align-items-center d-flex">
                                    <a href="/login" className="text-primary">Do you have account?</a>
                                    <button type="submit" className="btn btn-primary mt-4">
                                        {loading ? "loading.." : "Register"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration
