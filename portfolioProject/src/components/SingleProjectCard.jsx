import React, { useState } from 'react';
import styles from "./MyProjectsList.module.css";
import SpecificProjectModal from './SpecificProjectModal';

const SingleProjectCard = ({ project }) => {
    // State to manage the modal open/close state
    const [isOpen, setIsOpen] = useState(false);

    // Function to handle opening the modal
    const handleOpenModal = () => {
        setIsOpen(true);
    }

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            {/* Pass project and isOpen state to the SpecificProjectModal */}
            <SpecificProjectModal project={project} isOpen={isOpen} onClose={handleCloseModal} />
            <div className={styles.cardbox}>
                <img src={project.imageUrl} alt="card image" className={styles.cardimg}/>
                <div className={styles.namecontainer}>
                    <h3>{project.title}</h3>
                    {/* On button click, open the modal */}
                    <button onClick={handleOpenModal} className={styles.viewbtn}>View Project</button>
                </div>
            </div>
        </div>
    );
}

export default SingleProjectCard;
