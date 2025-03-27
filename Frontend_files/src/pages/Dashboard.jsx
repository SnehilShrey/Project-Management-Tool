import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [allProjects, setAllProjects] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  // Fetch projects from backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/projects") // Update URL based on your backend
      .then((response) => response.json())
      .then((data) => {
        setAllProjects(data);
        setCurrentProjects(data.filter(project => project.status === "On Going"));

        // Extract upcoming deadlines sorted by nearest date
        const upcomingTasks = data
          .filter(project => project.status === "On Going" && project.endDate)
          .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

        setUpcomingDeadlines(upcomingTasks);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to My Project Management App</h1>
        <p className="dashboard-text">Manage your projects efficiently with our tools.</p>

        {/* Sections with Updated Data */}
        <div 
          className="dashboard-section" 
          onClick={() => navigate("/current-projects", { state: { currentProjects } })}
        >
          <h3>Current Projects</h3>
          <p>Track your ongoing projects here.</p>
          <p><strong>{currentProjects.length}</strong> projects in progress.</p>
        </div>

        <div 
          className="dashboard-section" 
          onClick={() => navigate("/all-projects", { state: { allProjects } })}
        >
          <h3>All Projects</h3>
          <p>Check the list of all projects here.</p>
          <p><strong>{allProjects.length}</strong> total projects.</p>
        </div>

        <div 
          className="dashboard-section" 
          onClick={() => navigate("/upcoming-deadlines", { state: { upcomingDeadlines } })}
        >
          <h3>Upcoming Deadlines</h3>
          <p>Stay ahead of your tasks with timely reminders.</p>
          <p><strong>{upcomingDeadlines.length}</strong> deadlines approaching.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;