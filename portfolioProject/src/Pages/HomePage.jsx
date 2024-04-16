import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FindMe from "../Components/FindMe";

const HomePage = () => {
  // Index of role to display and write word
  const [index, setIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  // Track whether we are currently writing or erasing
  const [isWriting, setIsWriting] = useState(true);
  // Track the direction of the animation (1 for writing, -1 for erasing)
  const [animationDirection, setAnimationDirection] = useState(1);

  // Using state for getting projects
  const [data, setData] = useState([]);

  // useEffect hook to retrieve projects from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await handleGetRequests("projects/allprojects");
        if (resp.status === 200) {
          setData(resp.data.projects);
        } else if (resp.status === 404 || resp.status === 500) {
          console.log(resp.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  // Array showing my roles
  const roles = [
    "A Software Developer.",
    "An Accountant.",
    "A Web Developer.",
    "A Backend Developer.",
  ];

  // Role to display
  const role = roles[index];

  // Function to alternate roles
  useEffect(() => {
    const interval = setInterval(() => {
      // Update word index based on animation direction
      setWordIndex((prevWordIndex) => prevWordIndex + animationDirection);

      // Check if we've reached the end of the role
      if (wordIndex >= role.length && isWriting) {
        // If writing, switch to erasing
        setIsWriting(false);
        setAnimationDirection(-1); // Change animation direction to erase
      } else if (wordIndex <= 0 && !isWriting) {
        // If erasing, switch to writing and move to the next role
        setIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsWriting(true);
        setAnimationDirection(1); // Change animation direction to write
      }
    }, 200); // Adjust the interval for smoother animation

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [isWriting, role, roles, wordIndex, animationDirection]);

  // Render the component
  return (
    <div className={styles.about}>
      <FindMe/>
      <div className={styles.aboutinfo}>
        <div className={styles.aboutheader}>
          <h2>Hey, I'm <span>Florence</span> Kamau.</h2>
          {/* Display the current portion of the role */}
          <h3>{role.substring(0, wordIndex + 1)}|</h3>
          <div>
            <Link to='/about'><span className={styles.btn}>About me <FontAwesomeIcon icon={faArrowRight}/></span></Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
