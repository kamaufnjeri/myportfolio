import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './GoToButton.module.css'


const GoToButton = ({ name, url }) => {
  return (
    <Link to={ url }><span className={styles.btn}>{ name }<FontAwesomeIcon icon={faArrowRight} /></span></Link>
  )
}

export default GoToButton
