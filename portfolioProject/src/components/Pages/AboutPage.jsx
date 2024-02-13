import { useEffect, useState } from "react";
import styles from "./AboutPage.module.css";
import Button from "../Button";

const AboutPage = () => {
  // Index of role to display and write word
  const [index, setIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  // Track whether we are currently writing or erasing
  const [isWriting, setIsWriting] = useState(true);
  // Track the direction of the animation (1 for writing, -1 for erasing)
  const [animationDirection, setAnimationDirection] = useState(1);

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
      <div className={styles.aboutinfo}>
        <div className={styles.aboutheader}>
          <h2>👋 Hey there! I'm Florence Kamau.</h2>
          {/* Display the current portion of the role */}
          <h3>{role.substring(0, wordIndex + 1)}|</h3>
          <div>
            <p>
              🎓 Graduating with a degree in B.Com Accounting from Kenyatta
              University was just the beginning. My journey into the world of
              problem-solving began there. 💡
            </p>
            <br />
            <p>
              🚀 Fast forward to today, and I'm on an exciting path as a
              software engineer. It all started when I stumbled upon ALX, where
              I discovered my passion for creating innovative solutions. 💻
            </p>
            <br />
            <p>
              ⏳ Currently, I'm immersed in the final stretch of ALX's software
              engineering course, specializing in backend development. Every day
              is an opportunity to learn, grow, and make a real impact. 🌟
            </p>
            <br />
          </div>
          <div>
            <Button name="Download CV" />
          </div>
        </div>
        <div className="myimage">
          <img src="coding.jpg" alt="codes" />
          <img src="helmt.jpg" alt="helmet" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
