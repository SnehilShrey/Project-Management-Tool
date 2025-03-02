import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            }, { withCredentials: true }); // Allow credentials (cookies, auth headers)

            console.log("Login Successful", response.data);
            navigate("/dashboard"); // Redirect to dashboard on success
        } catch (error) {
            console.error("Login Failed", error.response?.data || error.message);
            setError(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="text-center fw-bold mb-4">Login</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="mt-3 text-center">
                    New user? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;