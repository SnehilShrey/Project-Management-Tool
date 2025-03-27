import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching projects:", error));
  }, []);

  const deleteProject = (id) => {
    axios.delete(`http://localhost:5000/api/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project._id !== id));
      })
      .catch(error => console.error("Error deleting project:", error));
  };

  return (
    <div>
      <h2>Projects</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>{project.deadline}</td>
              <td>
                <Button variant="danger" onClick={() => deleteProject(project._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Projects;