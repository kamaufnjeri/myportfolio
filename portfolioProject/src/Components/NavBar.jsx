import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from "react";


const NavBar = () => {
    //state to show the navbar items
    const [isVisible, setIsVisible] = useState(false);

    //function to toggle seeing the navbar items
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    // return the navbar 
    return (
        <div className={styles.navbar}>
            <div>
                <li className={styles.navItem}>
                    <NavLink to="/admindashboard" className={styles.myname}>Kamau F. Njeri</NavLink>
                </li>
            </div>
            <div className={styles.barlists}>
                <FontAwesomeIcon icon={faBars} className={styles.baricon} onClick={toggleVisibility}/>
                <ul className={`${styles.links} ${isVisible ? styles.visible: styles.hidden}`}>
                    <li className={styles.navItem}>
                        <NavLink to="/" className={styles.navlink}>Home</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to="/about" className={styles.navlink} id='about'>About</NavLink>
                        
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to="/myprojects" className={styles.navlink}>My projects</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to="/contact" className={styles.navlink}>Contact</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink to="/blogs" className={styles.navlink}>My blogs</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
