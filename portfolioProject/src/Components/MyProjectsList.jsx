import React from 'react';
import SingleProjectCard from './SingleProjectCard';
import styles from "./MyProjectsList.module.css";


const MyProjectsList = ({ projects }) => {
    return (
        <div className={styles.myprojectsbox}>
            {projects && projects.map(project => (
                <SingleProjectCard key={project._id} project={project} />
            ))}
            
        </div>
    );
};

export default MyProjectsList;
