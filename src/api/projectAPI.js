import axios from "axios";

const API_URL = "http://localhost:5000/api/projects"; // Backend API URL

// Function to fetch all projects
export const fetchProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Projects fetched:", response.data); // ✅ Log Response
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Function to add a new project
export const addProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData);
    return response.data;
  } catch (error) {
    console.error("Error adding project:", error);
    return null;
  }
};