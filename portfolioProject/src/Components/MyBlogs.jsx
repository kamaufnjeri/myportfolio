import React, { useEffect, useState } from 'react';
import styles from './MyProjectsList.module.css';
import { handleGetRequests } from '../Methods/handleApiRequests';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Loading from './Loading';

const MyBlogs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [retries, setRetries] = useState(0);
  const [error, setError] = useState(null);
  const maxRetries = 5;


  // useEffect hook to retrieve projects from MongoDB
  const fetchData = async () => {
    try {
      const resp = await handleGetRequests("blogs/allblogs");
      if (resp.status === 200) {
        setData(resp.data.blogs);
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
    const pollingInterval = 1000; // Initial polling interval (10 seconds)
    const intervalId = setInterval(fetchData, retries > 0 ? pollingInterval * Math.pow(2, retries) : pollingInterval);
    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure useEffect runs only once
  return (
    <div className={styles.myprojectsbox}>
      {isLoading && <Loading/>}
      {data && data.map((blog) => (
        <div className={styles.projectBox} key={blog._id}>
          <div className={styles.cardbox} key={blog._id}>
            <img src={blog.bannerUrl} alt="blog banner image" className={styles.cardimg} />
            <div className={styles.namecontainer}>
              <h3>{blog.title}</h3>
              <Link to={`/blogs/${blog._id}`}><button className={styles.viewbtn}>View Blog</button></Link>
            </div>
          </div>
          <div className={styles.projectInfo}>
            <h1>{blog.title}</h1>
            <p>Posted on {dayjs(blog.createdAt).format('MMMM D, YYYY HH:mm')} . . .</p>
            <br />
            <div>
              <Link to={`/blogs/${blog._id}`} className={styles.btn}>View More <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
          </div>
        </div>

      ))}
      {error && <p>{error}</p>}
    </div>
  )
}

export default MyBlogs
