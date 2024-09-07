import React from 'react'
import styles from './FindMe.module.css'
import { Link } from 'react-router-dom'

const FindMe = () => {
  return (
    <div className={styles.findMe}>
        <div className={styles.icons}>
          <div className={styles.icon}>
            <Link
              to="https://github.com/kamaufnjeri"
              target="_blank"
              className={styles.link}
            >
              <img src="/github.png" alt="github image" />
            </Link>
            <span>Github</span>
          </div>

          <div className={styles.icon}>
            <Link
              to="mailto:kamaufnjeri2019@gmail.com"
              target="_blank"
              className={styles.link}
            >
              <img src="/gmail.png" alt="gmail image" />
            </Link>
            <span>Gmail</span>
          </div>

          <div className={styles.icon}>
            <Link
              to="https://www.linkedin.com/in/florence-kamau-696874241/"
              target="_blank"
              className={styles.link}
            >
              <img src="/linkedin.png" alt="linkedin image" />
            </Link>
            <span>Linkedin</span>
          </div>

          <div className={styles.icon}>
            <Link
              to="https://twitter.com/kamaufnjeri"
              target="_blank"
              className={styles.link}
            >
              <img src="/twitter.png" alt="twitter image" />
            </Link>
            <span>Twitter</span>
          </div>
        </div>
      </div>
  )
}

export default FindMe
