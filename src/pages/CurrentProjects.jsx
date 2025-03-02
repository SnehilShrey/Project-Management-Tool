import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import "../styles/CurrentProjects.css";

const CurrentProjectsTable = ({ onProjectAdd, onDeadlineUpdate }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState(new Set());
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [newProject, setNewProject] = useState({ name: "", details: "", endDate: "", status: "On Going" });

    // Fetch projects from the database when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/projects"); // GET request
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    // Handle adding a new project
    const handleAddProject = async () => {
        if (!newProject.name.trim() || !newProject.details.trim() || !newProject.endDate.trim()) return;

        try {
            const response = await axios.post("http://localhost:5000/api/projects", newProject); // POST request
            setProjects([...projects, response.data]); // Update state with new project
            setNewProject({ name: "", details: "", endDate: "", status: "On Going" }); // Reset input fields
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    // Handle deleting selected projects
    const handleDeleteProjects = async () => {
        if (selectedProjects.size === 0) return;

        try {
            const projectIdsToDelete = [...selectedProjects].map(index => projects[index]._id);
            await axios.delete("http://localhost:5000/api/projects", { data: { projectIds: projectIdsToDelete } });

            setProjects(prevProjects => prevProjects.filter((_, index) => !selectedProjects.has(index)));
            setSelectedProjects(new Set()); // Clear selection
        } catch (error) {
            console.error("Error deleting projects:", error);
        }
    };

    // Handle editing project details (auto-save)
    const handleEditProject = async (index, field, value) => {
        const updatedProjects = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);

        try {
            await axios.put(`http://localhost:5000/api/projects/${projects[index]._id}`, {
                [field]: value,
            }); // PUT request to update field
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    // Toggle project selection
    const toggleProjectSelection = (index) => {
        const updatedSelection = new Set(selectedProjects);
        updatedSelection.has(index) ? updatedSelection.delete(index) : updatedSelection.add(index);
        setSelectedProjects(updatedSelection);
    };

    // Toggle expanding details row
    const toggleExpandRow = (index) => {
        const updatedExpandedRows = new Set(expandedRows);
        updatedExpandedRows.has(index) ? updatedExpandedRows.delete(index) : updatedExpandedRows.add(index);
        setExpandedRows(updatedExpandedRows);
    };

    return (
        <div className="container mt-4">
            <h2>Current Projects</h2>
            <Form className="mb-3">
                <Form.Control type="text" placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="mb-2" />
                <Form.Control as="textarea" placeholder="Project Details" value={newProject.details} onChange={(e) => setNewProject({ ...newProject, details: e.target.value })} className="mb-2" />
                <Form.Control type="date" value={newProject.endDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} className="mb-2" />
                <Button variant="primary" onClick={handleAddProject} className="me-2">Add</Button>
                <Button variant="danger" onClick={handleDeleteProjects}>Delete</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>S. No.</th>
                        <th>Project Name</th>
                        <th>End Date</th>
                        <th>Project Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <React.Fragment key={project._id}>
                            <tr>
                                <td><Form.Check type="checkbox" checked={selectedProjects.has(index)} onChange={() => toggleProjectSelection(index)} /></td>
                                <td>{index + 1}</td>
                                <td><Form.Control type="text" value={project.name} onChange={(e) => handleEditProject(index, "name", e.target.value)} /></td>
                                <td><Form.Control type="date" value={project.endDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => handleEditProject(index, "endDate", e.target.value)} /></td>
                                <td>
                                    <Form.Select value={project.status} onChange={(e) => handleEditProject(index, "status", e.target.value)}>
                                        <option value="On Going">On Going</option>
                                        <option value="Completed">Completed</option>
                                    </Form.Select>
                                </td>
                                <td><Button variant="link" onClick={() => toggleExpandRow(index)}>...</Button></td>
                            </tr>
                            {expandedRows.has(index) && (
                                <tr>
                                    <td colSpan="6"><Form.Control as="textarea" value={project.details} onChange={(e) => handleEditProject(index, "details", e.target.value)} /></td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

CurrentProjectsTable.propTypes = {
    onProjectAdd: PropTypes.func.isRequired,
    onDeadlineUpdate: PropTypes.func.isRequired,
};

export default CurrentProjectsTable;