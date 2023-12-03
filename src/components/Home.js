import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/devartes");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Error fetching data from GitHub");
        }
      } catch (error) {
        console.error("Error connecting to GitHub API", error);
      }
    };

    fetchUserData();
  }, []);

  const { name, avatar_url } = userData;

  return (
    <div className="container-home">
      <div className="home-content">
        <figure>
          <img src={avatar_url} alt={name || "User"} />
        </figure>
      </div>
      <div>
        <div className="text">
          <h1>{`Hello, I am ${name || "User"}`}</h1>
        </div>
        <div className="social-icons">
          <a
            href="https://github.com/devartes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/anacdcavalcante"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
