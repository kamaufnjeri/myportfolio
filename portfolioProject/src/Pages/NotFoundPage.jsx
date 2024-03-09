import React from 'react'
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <img src="/404error.png" alt="not found tag" />
    </div>
  )
}
