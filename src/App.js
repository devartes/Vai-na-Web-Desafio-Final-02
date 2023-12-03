import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Link as ScrollLink,
  Element,
  animateScroll as scroll,
} from "react-scroll";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import "./styles.css";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  color += "80";

  return color;
};

const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 128 ? "#000000" : "#FFFFFF";
};

const generateRandomShapes = () => {
  const numShapes = 10;
  const shapes = [];

  for (let i = 0; i < numShapes; i++) {
    const size = Math.random() * 100 + 50;
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    const color = getRandomColor();
    const duration = Math.random() * 5 + 5; 
    const delay = Math.random() * 5; 

    const shape = (
      <div
        key={i}
        className={`shape shape-${i}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          top: `${yPos}%`,
          left: `${xPos}%`,
          borderRadius: "50%",
          position: "fixed",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
          animation: `moveShape ${duration}s ${delay}s infinite linear`,
        }}
      ></div>
    );

    shapes.push(shape);
  }

  return shapes;
};

const App = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const homeBackgroundColor = getRandomColor();
  const aboutBackgroundColor = getRandomColor();
  const projectsBackgroundColor = getRandomColor();

  const shapes = generateRandomShapes();

  useEffect(() => {
    if (hasSvgOnPage()) {
      const svgElements = document.querySelectorAll("svg");
      svgElements.forEach((svg) => {
        svg.style.fill = getContrastColor(homeBackgroundColor);
      });
    }
  }, [homeBackgroundColor]);

  const hasSvgOnPage = () => {
    return document.querySelector("svg") !== null;
  };

  return (
    <Router>
      <nav>
        <ScrollLink to="/" smooth={true} duration={500} onClick={scrollToTop}>
          Home
        </ScrollLink>
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          onClick={scrollToTop}
        >
          About me
        </ScrollLink>
        <ScrollLink to="projects" smooth={true} duration={500}>
          Projects
        </ScrollLink>
      </nav>

      <Element
        name="/"
        style={{
          backgroundColor: homeBackgroundColor,
          color: getContrastColor(homeBackgroundColor),
        }}
      >
        <Home />
      </Element>

      <Element
        name="about"
        style={{
          backgroundColor: aboutBackgroundColor,
          color: getContrastColor(aboutBackgroundColor),
        }}
      >
        <About />
      </Element>

      <Element
        name="projects"
        style={{
          backgroundColor: projectsBackgroundColor,
          color: getContrastColor(projectsBackgroundColor),
          transparence: 0.5,
        }}
      >
        <Projects />
      </Element>

      <div id="shape-container">
        {shapes.map((shape, index) => (
          <React.Fragment key={index}>{shape}</React.Fragment>
        ))}
      </div>
    </Router>
  );
};

export default App;
