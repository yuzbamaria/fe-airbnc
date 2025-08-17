import styles from "./styles/Footer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <p>@ 2025 AirbNC by Maria Yuzba</p>
                <a 
                    href="https://github.com/yuzbamaria/fe-airbnc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.gitHubLink}
                >
                    <FontAwesomeIcon icon={faGithub} className={styles.gitHubIcon}/>
                </a>
            </footer>
        </>
    )
};