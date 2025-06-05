import styles from "./styles/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; 
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import Login from "./Login";
import Signup from "./Signup";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { guestId, hostId } = useUser();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    function toggleMobileMenu() {
        setIsMenuOpen(!isMenuOpen);
    };

    function handleLoginLinkClick() {
        setIsLoginModalOpen(true);
        setIsSignupModalOpen(false);
    };

    function handleSignupClickFromLogin() {
        setIsSignupModalOpen(true);
        setIsLoginModalOpen(false);
    };

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
                    <h1>
                        <Link to={`/`} className={styles.logo}>AirBNC</Link>
                    </h1>
                    <ul>
                        <li><button className={styles.authBtns}>Sign up</button></li>
                        <li><button className={styles.authBtns} onClick={handleLoginLinkClick}>Log in</button></li>
                    </ul>

                    {isLoginModalOpen && (
                        <Login 
                            setIsLoginModalOpen={setIsLoginModalOpen} 
                            onSignupClick={handleSignupClickFromLogin}
                        />
                    )}

                    {isSignupModalOpen && (
                        <Signup 
                            setIsSignupModalOpen={setIsSignupModalOpen}
                        />
                    )}

                    <ul>
                        <li><Link to={`/users/${guestId}`} className={styles.modesLinks}>Guest</Link></li>
                        <li><Link to={`/properties?host=${hostId}`} className={styles.modesLinks}>Host</Link></li>
                    </ul>
                </nav>   
            </header> 
        </>
    );
}
