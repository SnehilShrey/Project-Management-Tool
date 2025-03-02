import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const AllProjects = ({ currentProjects, setCurrentProjects }) => {
  const [selectedProjects, setSelectedProjects] = useState(new Set());

  // Fetch projects from the database when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects"); // GET request to fetch projects
        setCurrentProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [setCurrentProjects]); // Runs only when setCurrentProjects changes

  // Handle deletion of selected projects
  const handleDeleteSelected = async () => {
    if (selectedProjects.size === 0) return;

    try {
      // Convert selected project indexes to their respective IDs
      const projectsToDelete = [...selectedProjects].map(index => currentProjects[index]._id);

      // Send DELETE request to remove selected projects
      await axios.delete("http://localhost:5000/api/projects", { data: { projectIds: projectsToDelete } });

      // Update state by filtering out deleted projects
      setCurrentProjects(prevProjects => prevProjects.filter((_, index) => !selectedProjects.has(index)));

      setSelectedProjects(new Set()); // Clear selection after deletion
    } catch (error) {
      console.error("Error deleting projects:", error);
    }
  };

  // Toggle project selection
  const toggleSelection = (index) => {
    setSelectedProjects((prev) => {
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
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No Projects Available</td>
            </tr>
          ) : (
            currentProjects.map((project, index) => (
              <tr key={project._id}> {/* Using _id as key */}
                <td>
                  <Form.Check 
                    type="checkbox" 
                    onChange={() => toggleSelection(index)} 
                    checked={selectedProjects.has(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.deadline}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

AllProjects.propTypes = {
  currentProjects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Ensure each project has a unique ID
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCurrentProjects: PropTypes.func.isRequired,
};

export default AllProjects;
