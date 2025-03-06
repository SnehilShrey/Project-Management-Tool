import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";

const UpcomingDeadlines = ({ projects = [] }) => {
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Received projects:", projects); // ✅ Debugging log

    if (Array.isArray(projects) && projects.length > 0) {
      const deadlines = projects
        .filter((project) => project.endDate) // ✅ Fix: use 'endDate' instead of 'deadline'
        .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

      console.log("Filtered deadlines:", deadlines); // ✅ Debugging log
      setUpcomingDeadlines(deadlines);
    } else {
      console.log("No projects with deadlines found.");
    }
    setLoading(false);
  }, [projects]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete deadline");

      setUpcomingDeadlines((prevDeadlines) =>
        prevDeadlines.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error("Error deleting deadline:", error);
      alert("Failed to delete deadline. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upcoming Deadlines</h2>
      {loading && <p>Loading deadlines...</p>}
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Project Name</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && upcomingDeadlines.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No Upcoming Deadlines</td>
            </tr>
          ) : (
            upcomingDeadlines.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{new Date(task.endDate).toLocaleDateString()}</td> {/* ✅ Fix: use 'endDate' */}
                <td>
                  <Button variant="danger" onClick={() => handleDelete(task._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

UpcomingDeadlines.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      endDate: PropTypes.string, // ✅ Fix: use 'endDate' instead of 'deadline'
    })
  ),
};

export default UpcomingDeadlines;