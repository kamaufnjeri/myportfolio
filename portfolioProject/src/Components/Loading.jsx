import styles from "./Loading.module.css"
import React from 'react'

const Loading = () => {
  return (
    <div className={styles.loadingCont}>
      <div className={styles.loadingCircle}>
      </div>
    </div>
  )
}

export default Loading
