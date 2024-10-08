import React, { useEffect, useState } from 'react';
import './authUI.css';
import api from '../auth/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = api.login({ "username": username, "password": password })
            result.then(result => {
                if(result==false) {
                    setLoading(false)
                    setError(true)
                }
                else{
                    setLoading(false)
                setError(false)
                }
            })
                .catch(error => {
                    console.log(error)

                })
        } catch (e) {
            console.log(e)
        }

        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow bg-dark text-white">
                        <div className="card-header text-center">
                            <h4>Login</h4>
                        </div>
                        {error && <span className="text-danger text-center">incorrect username or password</span>}
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
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name='password'
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="justify-content-between align-items-center d-flex">
                                    <a href="/register" className="mt-3 ">Register</a>
                                    <button type="submit" className="btn btn-primary mt-4">
                                        {loading ? "loading.." : "Login"}
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

export default Login
