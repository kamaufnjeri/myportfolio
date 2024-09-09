import React, { useEffect, useRef, useState } from 'react';
import styles from "./SpecificProjectModal.module.css";
import { handleGetRequests } from '../Methods/handleApiRequests';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SpecificProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const projectRef = useRef(null);
  const [tools, setTools] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = 3;



  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
    console.log(currentIndex * 100)
  };

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };


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

        setTools(fetchedTools.filter(tool => tool !== null));
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    }

    fetchTools();
  }, [project]);

  const closeModal = (e) => {
    if (!projectRef.current.contains(e.target)) {
      onClose();
      setCurrentIndex(0);
    }
  }
  return (
    <div className={styles.modalbox} ref={modalRef} onClick={closeModal}>
      <div className={styles.projectcontentBox} ref={projectRef}>
        <div className={styles.header}>
          <h2 className={isOpen ? styles.appearAnimation : ""}>{project.title}</h2>
          <span onClick={onClose} className={isOpen ? styles.appearAnimation : ""}>&#10006;</span>
        </div>
        <div className={styles.projectOuterBox}>
          <button onClick={() => slideLeft()} className={styles.leftArrow}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className={styles.projectcontent} style={{ transform: `translateX(-${currentIndex * 100}%` }}>
          <div className={styles.mainBox}>
            <div className={styles.contentBox}>
              <h4>About the project :</h4>
              <p>{project.description}</p>
              <h4>Tools used during development :</h4>
              <div className={styles.toolsBox}>
                {tools && tools.map(tool => (
                  <span key={tool._id}>{tool.name}</span>
                ))}
              </div>

              <h4>Urls for the project :</h4>
              <div className={styles.urlBox}>
                <a href={project.sourceCodeUrl} target="_blank" className={styles.viewbtn}>View source code</a>
                {project.websiteUrl !== "" && <a href={project.websiteUrl} target="_blank" className={styles.viewbtn}>View Website</a>}
              </div>
            </div>
          </div>
          <div className={styles.mainBox}>
            <div className={styles.contentBox}>
              <h4>Project video :</h4>
              {project.videoUrl && <div className={styles.videoBox} dangerouslySetInnerHTML={{ __html: project.videoUrl }}></div>}
            </div>
          </div>
        
          
          <div className={styles.mainBox}>
            {
              project.challenges !== "" && <div className={styles.contentBox}>
                <h4>What are the challenges I faced when working on the project ?</h4>
                <p>{project.challenges}</p>
              </div>
            }
          </div>
          <div className={styles.mainBox}>
            {
              project.lessonsLearnt !== "" && <div className={styles.contentBox}>
                <h4>What are the lessons learnt ?</h4>
                <p>{project.lessonsLearnt}</p>
              </div>
            }
          </div>
          </div>
         
          <button onClick={() => slideRight()} className={styles.rightArrow}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

        </div>

      </div>
    </div>
  )
}

export default SpecificProjectModal;