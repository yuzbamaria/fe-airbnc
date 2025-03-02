import styles from "./styles/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; 
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMobileMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <button 
                        onClick={toggleMobileMenu}
                        className={styles.menuIcon} 
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {isMenuOpen && (
                        <>
                            <div 
                                className={styles.overlay} 
                                onClick={toggleMobileMenu} 
                                aria-label="Close Menu"
                            >
                                <ul className={styles.open} onClick={(e) => e.stopPropagation()}>
                                    <li><Link to="/" className={styles.navLink}>Home</Link></li>
                                    <li><Link to="/contacts" className={styles.navLink}>Contacts</Link></li>
                                </ul>
                            </div>
                        </>
                    )}
                    <h1>AirbNC</h1>
                    <ul>
                        <li>Guest</li>
                        <li>Host</li>
                    </ul>
                </nav>   
            </header> 
        </>
    );
}
