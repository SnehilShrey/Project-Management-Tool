import React from "react";
import "../styles/Dashboard.css"; // Import CSS
import Navbar from "../components/Navbar"; // Corrected import path for Navbar

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar /> {/* Navigation Bar */}

      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to My Project Management App</h1>
        <p className="dashboard-text">Manage your projects efficiently with our tools.</p>

        {/* Sections */}
        <div className="dashboard-section">
          <h3>Current Projects</h3>
          <p>Track your ongoing projects here.</p>
        </div>

        <div className="dashboard-section">
          <h3>All Projects</h3>
          <p>Check the list of all projects here.</p>
        </div>

        <div className="dashboard-section">
          <h3>Upcoming Deadlines</h3>
          <p>Stay ahead of your tasks with timely reminders.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

