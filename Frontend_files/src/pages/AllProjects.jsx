import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const AllProjects = ({ projects = [], setProjects }) => {
  const [selectedProjects, setSelectedProjects] = useState(new Set());

  // ✅ Handle bulk deletion of selected projects
  const handleDeleteSelected = async () => {
    if (selectedProjects.size === 0) return;

    try {
      const projectsToDelete = [...selectedProjects].map(index => projects[index]?._id);

      // ✅ Delete each project individually
      await Promise.all(projectsToDelete.map(id => axios.delete(`http://localhost:5000/api/projects/${id}`)));

      // ✅ Remove deleted projects from state
      setProjects(prevProjects => prevProjects.filter(project => !projectsToDelete.includes(project._id)));

      setSelectedProjects(new Set()); // ✅ Clear selection after deletion
    } catch (error) {
      console.error("Error deleting projects:", error);
      alert("Failed to delete projects. Please try again.");
    }
  };

  // ✅ Toggle project selection
  const toggleSelection = (index) => {
    setSelectedProjects(prev => {
      const newSelection = new Set(prev);
      newSelection.has(index) ? newSelection.delete(index) : newSelection.add(index);
      return newSelection;
    });
  };

  return (
    <div className="container mt-4">
      <h2>All Projects</h2>
      <Button 
        variant="danger" 
        className="mb-2" 
        onClick={handleDeleteSelected} 
        disabled={selectedProjects.size === 0}
      >
        Delete Selected
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>S. No.</th>
            <th>Project Name</th>
            <th>Project Details</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={project?._id || index}>
                <td>
                  <Form.Check 
                    type="checkbox" 
                    onChange={() => toggleSelection(index)} 
                    checked={selectedProjects.has(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{project?.name || "N/A"}</td>
                <td>{project?.details || "No details available"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No Projects Available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

AllProjects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      details: PropTypes.string,
    })
  ),
  setProjects: PropTypes.func.isRequired,
};

export default AllProjects;