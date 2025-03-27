import Project from "../models/Project.js";

// Get all projects
export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// Create a new project
export const createProject = async (req, res) => {
  const { name, status, deadline } = req.body;
  const newProject = new Project({ name, status, deadline });

  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: "Failed to create project" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete project" });
  }
};