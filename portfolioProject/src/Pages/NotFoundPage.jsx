import React from 'react'
import styles from "./NotFoundPage.module.css";
import FindMe from "../Components/FindMe";

export default function NotFoundPage() {
  return (
    <div>
      <FindMe/>
      <div className={styles.notFound}>
        <img src="/404error.png" alt="not found tag" />
      </div>
    </div>

  )
}
