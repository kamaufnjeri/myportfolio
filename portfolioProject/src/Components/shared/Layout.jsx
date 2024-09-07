import React from 'react'
import styles from './Layout.module.css'
import FindMe from './FindMe'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className={styles.fullPageContainer}>
      <div className={styles.mainContainer}>
        <FindMe/>
        <div className={styles.scrollContainer}>
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
