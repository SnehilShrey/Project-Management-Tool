import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CurrentProjects from "./pages/CurrentProjects";
import AllProjects from "./pages/AllProjects";
import UpcomingDeadlines from "./pages/UpcomingDeadlines";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectList from "./components/ProjectList";  // Fetch Projects (GET)
import AddProject from "./components/AddProject";    // Add Projects (POST)

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/current-projects" element={<CurrentProjects />} />
      <Route path="/all-projects" element={<AllProjects />} />
      <Route path="/upcoming-deadlines" element={<UpcomingDeadlines />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/add-project" element={<AddProject />} />
    </Routes>
  );
};

export default App;