import React, { useState, useEffect } from "react";

const About = () => {
  const [userData, setUserData] = useState({ bio: "", repos: [] });

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await fetchData("https://api.github.com/users/devartes");
        const repos = await fetchData(user.repos_url);
        const uniqueLanguages = Array.from(
          new Set(repos.map((repo) => repo.language))
        ).filter(Boolean);
        setUserData({ ...user, uniqueLanguages });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const { bio, uniqueLanguages } = userData;

  return (
    <div className="container-about">
      <div className="about-content">
        <h2>About me</h2>
      </div>
      <div className="about-text">
        <h3>My Job:</h3>
        <p>{bio}</p>
        <h3>Technologies Used on Github:</h3>
        <ul className="language-list">
          {uniqueLanguages ? (
            <>
              {uniqueLanguages.map((language, index) => (
                <li key={index} className="language-item">
                  {language}
                  {index !== uniqueLanguages.length - 1 && (
                    <span className="divider"></span>
                  )}
                </li>
              ))}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default About;
