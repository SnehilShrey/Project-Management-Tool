import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.taskName}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;