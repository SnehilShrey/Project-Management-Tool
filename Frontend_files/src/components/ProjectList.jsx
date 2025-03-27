import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api/projectAPI";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    getProjects();
  }, []);

  return (
    <div>
      <h2>Project List</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.name}</strong> - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;