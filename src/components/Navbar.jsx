import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../styles/Navbar.css"; // Import CSS

const Navbar = () => {
  const navigate = useNavigate(); // Hook for redirection

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear authentication
    navigate("/login"); // Redirect to correct login page
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Project Management App</h1>

      {/* Logout Button */}
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;