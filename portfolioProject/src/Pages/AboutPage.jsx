import React from 'react';
import styles from './AboutPage.module.css';
import FindMe from '../Components/FindMe';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const mySkills = [
  "Python", "JavaScript", "C",
  "Bash", "Linux", "DevOps",
  "MySQL", "MongoDB", "Flask",
  "Express", "React", "Git (GitHub)",
  "QuickBooks", "Sage 50 Accounts", "Tally Prime",
];

const myHobbies = [
  "Reading", "Writing", "Swimming"
]

const AboutPage = () => {

  return (
    <div className={styles.about}>
      <div className={styles.mainContainer}>
        <FindMe />
        <div className={styles.aboutme}>
          <div className={styles.aboutmeinfo}>
            <div className={styles.aboutmetext}>
              <h1>My Journey to Software Engineering: From Numbers to Innovation</h1>
              <p>
                I translate ideas into elegant code, building robust and scalable backend systems.
                My passion lies in uncovering efficient solutions to complex challenges.
                <br />
                <br />
                Equipped with a strong analytical background from my B.Com Accounting degree at
                Kenyatta University and honed technical skills from ALX, I'm adept at designing and
                implementing backend architecture that empowers seamless user experiences.
                <br />
                <br />
                Always learning and pushing boundaries, I'm eager to collaborate on exciting projects
                with a team that shares my dedication to innovation.
              </p>

            </div>
            <div className={styles.skills}>
              <h1>My Skills</h1>
              <div className={styles.myLists}>
                {mySkills && mySkills.map(skill => (
                  <span>{skill}</span>
                ))}
              </div>
            </div>
            <div className={styles.hobbies}>
              <h1>My hobbies</h1>
              <div className={styles.myLists}>
                {myHobbies && myHobbies.map(hobby => (
                  <span>{hobby}</span>
                ))}
              </div>
            </div>
            <div>
              <Link to='/myprojects'><span className={styles.btn}>Projects <FontAwesomeIcon icon={faArrowRight} /></span></Link>
            </div>
          </div>
          <div className={styles.imageCont}>
            <img src="flora.jpg" alt="my image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
