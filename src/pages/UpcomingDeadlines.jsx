import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const UpcomingDeadlines = () => {
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  // Fetch deadlines from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/deadlines") // Change this URL as per your backend API
      .then((response) => response.json())
      .then((data) => setUpcomingDeadlines(data))
      .catch((error) => console.error("Error fetching deadlines:", error));
  }, []);

  // Delete a deadline from the backend
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/deadlines/${id}`, {
        method: "DELETE",
      });

      // Update UI after successful deletion
      setUpcomingDeadlines((prevDeadlines) =>
        prevDeadlines.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error("Error deleting deadline:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upcoming Deadlines</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Task Name</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {upcomingDeadlines.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No Upcoming Deadlines</td>
            </tr>
          ) : (
            upcomingDeadlines.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.endDate}</td>
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
  upcomingDeadlines: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ),
};

export default UpcomingDeadlines;