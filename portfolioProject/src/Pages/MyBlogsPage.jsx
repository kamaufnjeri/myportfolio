import React, { useEffect, useState } from 'react';
import MyBlogs from '../Components/MyBlogs'
import styles from './MyProjectsPage.module.css'
import GoToButton from '../Components/shared/GoToButton';

const MyBlogsPage = () => {

  return (
    
        <div className={styles.myprojects}>
          <h1>My Blogs</h1>
          <p>
            Dive into My World: Explore a Collection of My Blogs.
            Join me on a journey of words, where each blog is a window into my thoughts and experiences.
          </p>
          <MyBlogs />
          <div>
            <GoToButton name='Home' url='/'/>
          </div>
        </div>

  );
};

export default MyBlogsPage;
