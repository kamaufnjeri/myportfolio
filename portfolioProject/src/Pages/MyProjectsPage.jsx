import React, { useEffect, useState } from 'react';
import MyProjectsList from '../Components/MyProjectsList';
import Loading from '../Components/Loading';
import styles from './MyProjectsPage.module.css'
import { handleGetRequests } from '../Methods/handleApiRequests';
import FindMe from '../Components/FindMe';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MyProjectsPage = () => {
  // Using state for getting projects
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect hook to retrieve projects from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resp = await handleGetRequests("projects/allprojects");
        if (resp.status === 200) {
          setData(resp.data.projects);
          setIsLoading(false);
        } else if (resp.status === 404 || resp.status === 500) {
          console.log(resp.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
      
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className={styles.background}>
      {isLoading && <Loading/>}
      <div className={styles.mainContainer}>
        <FindMe />
        <div className={styles.myprojects}>
          <h1>My projects</h1>
          <p>
            Explore a showcase of my ALX journey over the past year,
            featuring a diverse range of captivating projects. From
            innovative initiatives to collaborative endeavors, each
            represents a milestone in my pursuit of excellence
          </p>
          <MyProjectsList projects={data} />
          <div>
            <Link to='/contact'><span className={styles.btn}>Contact <FontAwesomeIcon icon={faArrowRight} /></span></Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProjectsPage;
