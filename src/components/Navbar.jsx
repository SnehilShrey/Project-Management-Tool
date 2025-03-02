import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios"; // Import Axios for API calls
import "../styles/Navbar.css"; // Import CSS

const Navbar = () => {
  const navigate = useNavigate(); // Hook for redirection

  const handleLogout = async () => {
    try {
      // Send logout request to backend (optional if session-based)
      await axios.post("http://localhost:5000/api/logout");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Project Management App</h1>

      {/* Logout Button */}
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>

      {/* Navigation Links */}
      <div className="nav-links">
        <button className="btn btn-primary me-2" onClick={() => navigate("/current-projects")}>
          Current Projects
        </button>
        <button className="btn btn-primary me-2" onClick={() => navigate("/all-projects")}>
          All Projects
        </button>
        <button className="btn btn-primary me-2" onClick={() => navigate("/upcoming-deadlines")}>
          Upcoming Deadlines
        </button>
      </div>
    </nav>
  );
};

export default Navbar;