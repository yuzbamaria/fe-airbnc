import { forwardRef } from "react";
import styles from "./styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = forwardRef((_, ref) => {
  return (
    <>
      <footer className={styles.footer} ref={ref}>
        <div className={styles.topFooterContainer}>
          <div>
            <p className={styles.footerText}>
              AirbNC is a personal project exploring React and full-stack
              development.
            </p>
            <p className={styles.footerText}>
              Let’s connect to collaborate or chat about web dev!
            </p>
          </div>
          <div className={styles.footerLinksContainer}>
            <a
              href="https://github.com/yuzbamaria/fe-airbnc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className={styles.gitHubIcon} />
            </a>
            <a
              href="https://www.linkedin.com/in/mariyayuzba/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className={styles.linkedinIcon}
              />
            </a>
            <a href="mailto:yuzba.maria@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} className={styles.emailIcon} />
            </a>
          </div>
        </div>
        <div>
          <p className={styles.bottomText}>@2025 All rights reserved.</p>
        </div>
      </footer>
    </>
  );
});

export default Footer;