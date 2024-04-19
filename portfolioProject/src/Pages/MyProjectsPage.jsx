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
  const [retries, setRetries] = useState(0);
  const [error, setError] = useState(null);
  const maxRetries = 5;

  // useEffect hook to retrieve projects from MongoDB
  const fetchData = async () => {
    try {
      const resp = await handleGetRequests("projects/allprojects");
      if (resp.status === 200) {
        setData(resp.data.projects);
        setIsLoading(false);
        setRetries(0); // Reset retries on successful fetch
      } else if (resp.status === 404 || resp.status === 500) {
        throw new Error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message || error.toString());
      setIsLoading(false)
      setRetries(prevRetries => Math.min(prevRetries + 1, maxRetries));
    }
    
  };
  useEffect(() => {
    setIsLoading(true);
    const pollingInterval = 1000;
    const intervalId = setInterval(fetchData, retries > 0 ? pollingInterval * Math.pow(2, retries) : pollingInterval);
    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
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
          {data && <MyProjectsList projects={data} />}
          {error && <p>{error}</p>}
          <div>
            <Link to='/contact'><span className={styles.btn}>Contact <FontAwesomeIcon icon={faArrowRight} /></span></Link>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default MyProjectsPage;
