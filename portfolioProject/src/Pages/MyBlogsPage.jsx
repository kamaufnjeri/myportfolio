import React, { useEffect, useState } from 'react';
import MyBlogs from '../Components/MyBlogs'
import styles from './MyProjectsPage.module.css'
import { handleGetRequests } from '../Methods/handleApiRequests';
import FindMe from '../Components/FindMe';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MyBlogsPage = () => {

  return (
    <div className={styles.background}>
      <div className={styles.mainContainer}>
        <FindMe />
        <div className={styles.myprojects}>
          <h1>My Blogs</h1>
          <p>
            Dive into My World: Explore a Collection of My Blogs.
            Join me on a journey of words, where each blog is a window into my thoughts and experiences.
          </p>
          <MyBlogs />
          <div>
            <Link to='/'><span className={styles.btn}>Home <FontAwesomeIcon icon={faArrowRight} /></span></Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyBlogsPage;
