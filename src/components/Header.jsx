import styles from "./styles/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; 

export default function Header() {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <button className={styles.menuIcon} aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/contacts">Contacts</Link>
                        </li>
                    </ul>
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

 {/* <ul class="nav-links">
                    <li>
                        <a href="#home">Home</a>
                    </li>
                    <li>
                        <a href="#about">Another</a>
                    </li>
                    <li>
                        <a href="#services">Another</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                    </ul> */}