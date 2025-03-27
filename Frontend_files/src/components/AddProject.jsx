import React, { useState } from "react";
import { addProject } from "../api/projectAPI";

const AddProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { name, description };
    const response = await addProject(newProject);
    if (response) {
      alert("Project Added Successfully!");
      setName("");
      setDescription("");
    } else {
      alert("Failed to add project.");
    }
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;