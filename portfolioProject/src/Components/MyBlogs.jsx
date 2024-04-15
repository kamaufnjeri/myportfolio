import React, { useEffect, useState } from 'react';
import styles from './MyProjectsList.module.css';
import { handleGetRequests } from '../Methods/handleApiRequests';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const MyBlogs = () => {
  const [data, setData] = useState([]);
  // useEffect hook to retrieve projects from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await handleGetRequests("blogs/allblogs");
        if (resp.status === 200) {
          setData(resp.data.blogs);
        } else if (resp.status === 404 || resp.status === 500) {
          console.log(resp.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className={styles.myprojectsbox}>
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
            <p>Posted on {dayjs(data.createdAt).format('MMMM D, YYYY HH:mm')} . . .</p>
            <br />
            <div>
              <Link to={`/blogs/${blog._id}`} className={styles.btn}>View More <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}

export default MyBlogs
