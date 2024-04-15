import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";


const NavBar = () => {
    //state to show the navbar items
    const [isVisible, setIsVisible] = useState(false);
    const navBarRef = useRef(null);
    const barRef = useRef(null);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the clicked element is outside the navbar
            if (
                navBarRef.current &&
                !navBarRef.current.contains(event.target) &&
                !barRef.current.contains(event.target) &&
                isVisible
            ) {
                // Close the navbar if it is open
                setIsVisible(false);
            }
        };
        
    
        // Attach event listener to document body
        document.body.addEventListener('click', handleOutsideClick);
    
        // Cleanup event listener when component unmounts
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [isVisible])

    //function to toggle seeing the navbar items
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    // return the navbar 
    return (
        <div className={styles.navbar}>
            <div>
                <li className={styles.navItem}>
                    <NavLink to="/" className={styles.myname}>Kamau F. Njeri</NavLink>
                </li>
            </div>
            <div className={styles.barlists}>
                <FontAwesomeIcon icon={faBars} className={styles.baricon} onClick={toggleVisibility} ref={barRef}/>
                <ul className={`${styles.links} ${isVisible ? styles.visible : styles.hidden}`} ref={navBarRef}>
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
