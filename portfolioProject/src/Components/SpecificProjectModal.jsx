import React, { useEffect, useRef, useState } from 'react';
import styles from "./SpecificProjectModal.module.css";
import { handleGetRequests } from '../Methods/handleApiRequests';
import { Link } from 'react-router-dom';

const SpecificProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const projectRef = useRef(null);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    modalRef.current.style.transform = isOpen ? 'scaleX(1)' : 'scaleX(0)';
    modalRef.current.style.transition = "transform 0.5s ease-in-out";
    modalRef.current.style.transformOrigin = "right";
  }, [isOpen]);

  // fetch tools by id
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const promises = project.toolsAndTechnologies.map(async (toolId) => {
          const resp = await handleGetRequests("projects/alltools/" + toolId);
          if (resp.status === 200) {
            return resp.data.tool;
          } else {
            console.log(resp);
            return null; // Return null in case of error
          }
        });
        const fetchedTools = await Promise.all(promises);
        // Filter out null values (if any) and update state
        setTools(fetchedTools.filter(tool => tool !== null));
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    }

    fetchTools();
  }, [project]);
  const descriptionStyle = `${styles.description} ${isOpen ? styles.appearAnimation2 : ""}`;
  const toolsStyle = `${styles.tools} ${isOpen ? styles.appearAnimation3 : ""}`;
  const urlStyle = `${styles.urls} ${isOpen ? styles.appearAnimation4 : ""}`;
  const challengesStyle = `${styles.challenges} ${isOpen ? styles.appearAnimation5 : ""}`;
  const lessonsStyle = `${styles.lessonslearnt} ${isOpen ? styles.appearAnimation6 : ""}`;

  const closeModal = (e) => {
    if (!projectRef.current.contains(e.target)) {
      onClose();
    }
  }
  return (
    <div className={styles.modalbox} ref={modalRef} onClick={closeModal}>
      <div className={styles.projectcontent} ref={projectRef}>
        <div className={styles.header}>
          {/* Apply animation only when modal is open */}
          <h2 className={isOpen ? styles.appearAnimation : ""}>{project.title}</h2>
          <span onClick={onClose} className={isOpen ? styles.appearAnimation : ""}>&#10006;</span>
        </div>
        <div className={descriptionStyle}>
          <h4>About the project: </h4>
          <p>{project.description}</p>
          {project.videoUrl && <div className={styles.videoBox} dangerouslySetInnerHTML={{ __html: project.videoUrl }}></div>}
        </div>
        <div className={toolsStyle}>
          <h4>Tools used during development: </h4>
          <div className={styles.toolsBox}>
            {tools && tools.map(tool => (
              <span key={tool._id}>{tool.name}</span>
            ))}
          </div>
        </div>
        <div className={urlStyle}>
          <h4>Urls for the project: </h4>
          <div className={styles.urlBox}>
            <a href={project.sourceCodeUrl} target="_blank" className={styles.viewbtn}>View source code</a>
            {project.websiteUrl !== "" && <a href={project.websiteUrl} target="_blank" className={styles.viewbtn}>View Website</a>}
          </div>
        </div>
        {
          project.challenges !== "" && <div className={challengesStyle}>
            <h4>What are the challenges I faced when working on the project?</h4>
            <p>{project.challenges}</p>
          </div>
        }
        {
          project.lessonsLearnt !== "" && <div className={lessonsStyle}>
            <h4>What are the lessons learnt?</h4>
            <p>{project.lessonsLearnt}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default SpecificProjectModal;