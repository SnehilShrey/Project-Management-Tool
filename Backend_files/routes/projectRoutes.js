const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); // Import model

// 📌 Create a new project (POST)
router.post("/", async (req, res) => {
  console.log("Received POST request at /api/projects"); // Debugging log
  console.log("Request body:", req.body); // Log request data

  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get all projects (GET)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update a project (PUT)
router.put("/:id", async (req, res) => {  // ✅ Added ":id"
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Delete a project (DELETE)
router.delete("/:id", async (req, res) => {  // ✅ Added ":id"
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;