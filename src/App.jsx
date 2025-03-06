import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CurrentProjects from "./pages/CurrentProjects";
import AllProjects from "./pages/AllProjects";
import UpcomingDeadlines from "./pages/UpcomingDeadlines";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectList from "./components/ProjectList";  
import AddProject from "./components/AddProject";    
import axios from "axios";

const App = () => {
  const [projects, setProjects] = useState([]);

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/current-projects" element={<CurrentProjects projects={projects} setProjects={setProjects} />} />
      <Route path="/all-projects" element={<AllProjects projects={projects} setProjects={setProjects} />} />
      <Route path="/upcoming-deadlines" element={<UpcomingDeadlines projects={projects} />} />
      <Route path="/projects" element={<ProjectList projects={projects} />} />
      <Route path="/add-project" element={<AddProject projects={projects} setProjects={setProjects} />} />
    </Routes>
  );
};

export default App;
