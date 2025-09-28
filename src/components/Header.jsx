import styles from "./styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { cross } from "../icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
// import { useUser } from "../contexts/UserContext";

export default function Header({
  onScrollToProperties,
  onScrollToFooter,
  onLogin,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // const { guestId, hostId } = useUser();
  const { currentUser, handleLogout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/"; // check if we are on homepage
  const navigate = useNavigate();

  function toggleMobileMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleMobileLogin() {
    if (onLogin) {
      onLogin();
      setIsMenuOpen(false);
    }
  }

  function onLogout() {
    handleLogout();
    setIsMenuOpen(false);
    navigate("/");
  }

  return (
    <>
      <header className={`${styles.header} ${isHome ? styles.overlay : ""}`}>
        {/* =======> Mobile overlay menu <======= */}
        {isMenuOpen && (
          // transparent overlay
          <div className={styles.mobileOverlay}>
            <button
              className={styles.closeMobileMenuBtn}
              onClick={toggleMobileMenu}
            >
              {cross}
            </button>
            {/* menu drawer */}
            <div className={styles.mobileDrawer}>
              {currentUser ? (
                <div className={styles.userMenu}>
                  {/* Top section with name */}
                  <div className={styles.userInfo}>
                    <Link
                      to={`/users/${currentUser.user_id}`}
                      className={styles.currentUser}
                      onClick={toggleMobileMenu}
                    >
                      {currentUser.first_name} {currentUser.surname}
                    </Link>
                  </div>

                  {/* Bottom logout */}
                  <div className={styles.logoutWrapper}>
                    <button onClick={onLogout} className={styles.authBtn}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <ul className={styles.navList}>
                  <li
                    onClick={() => {
                      onScrollToProperties();
                      setIsMenuOpen(false);
                    }}
                  >
                    Properties
                  </li>
                  <li
                    onClick={() => {
                      onScrollToFooter();
                      setIsMenuOpen(false);
                    }}
                  >
                    Contacts
                  </li>
                  <li>
                    <button
                      className={styles.authBtn}
                      onClick={handleMobileLogin}
                    >
                      Login
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}

        {/* =======> Mobile menu button (visible only < 640px) <======= */}
        <div className={styles.mobileContainer}>
          <div>
            <button
              onClick={toggleMobileMenu}
              className={styles.mobileMenuHamburger}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logo}>
              AirBNC
            </Link>
          </div>
        </div>

        {/* =======> Desktop navigation (hidden on mobile) <======= */}
        <nav className={styles.desktopNav}>
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logo}>
              AirBNC
            </Link>
          </div>
          <ul>
            <li onClick={onScrollToProperties}>Properties</li>
            <li onClick={onScrollToFooter}>Contacts</li>
          </ul>

          {currentUser ? (
            <div className={styles.userInfo}>
              <Link
                to={`/users/${currentUser.user_id}`}
                className={styles.currentUser}
              >
                {currentUser.first_name}
              </Link>
              <button className={styles.authBtn} onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button className={styles.authBtn} onClick={onLogin}>
                Log in
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
