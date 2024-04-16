import React from 'react'
import SingleBlog from '../Components/SingleBlog';
import FindMe from '../Components/FindMe';
import styles from './SingleBlogPage.module.css';


const SingleBlogPage = () => {
  // styles variables
  
  return (
    <div className={styles.mainContentStyle}>
      <FindMe/>
      <SingleBlog />
    </div>
  );
}

export default SingleBlogPage
