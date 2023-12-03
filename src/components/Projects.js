import React, { useState, useEffect } from "react";

const Projects = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch("https://api.github.com/users/devartes/repos");
        if (response.ok) {
          const repositoriesData = await response.json();
          const filteredRepositories = repositoriesData.filter(repo => !repo.fork);
          setRepositories(filteredRepositories);
        } else {
          console.error("Failed to fetch repositories");
        }
      } catch (error) {
        console.error("Error fetching repositories", error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <div className="container-projects">
      <div className="projects-content">
        <h2>My Projects</h2>
        <div className="cards">
          {repositories.map((repo) => (
            <div key={repo.id} className="project-item">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
