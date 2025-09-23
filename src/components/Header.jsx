import styles from "./styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { cross } from "../icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "./auth/AuthProvider";
// import { useUser } from "../contexts/UserContext";

export default function Header({ propertiesRef, onLogin, onSignup }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // const { guestId, hostId } = useUser();
  const { currentUser, handleLogout } = useAuth();
  const propertiesRefLargeScreens = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/"; // check if we are on homepage

  function handleScrollToProperties() {
    if (propertiesRef && propertiesRef.current) {
      propertiesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function toggleMobileMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleMobileLogin() {
    if (onLogin) {
      onLogin();
      setIsMenuOpen(false);
    }
  }

  function toggleUserMenu() {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  function onLogout() {
    handleLogout();
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

                  {/* Middle nav */}
                  {/* <ul className={styles.navList}>
                    <li onClick={handleScrollToProperties}>Properties</li>
                    <li>
                      <Link to="/contacts" onClick={toggleMobileMenu}>
                        Contacts
                      </Link>
                    </li>
                  </ul> */}

                  {/* Bottom logout */}
                  <div className={styles.logoutWrapper}>
                    <button onClick={onLogout} className={styles.logoutBtn}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <ul className={styles.navList}>
                  <li onClick={handleScrollToProperties}>Properties</li>
                  <li>
                    <Link to="/contacts" onClick={toggleMobileMenu}>
                      Contacts
                    </Link>
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
          <button
            onClick={toggleMobileMenu}
            className={styles.mobileMenuHamburger}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logo}>
              AirBNC
            </Link>
          </div>
        </div>

        {/* =======> Desktop navigation (hidden on mobile) <======= */}
        {/* <nav className={styles.desktopNav}>
          <ul>
            <li
              ref={propertiesRefLargeScreens}
              onClick={handleScrollToProperties}
            >
              Properties
            </li>
            <li className={styles.logoContainer}>
              <Link to="/" className={styles.logo}>
                AirBNC
              </Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            {currentUser ? (
              <li className={styles.userSection}>
                <button className={styles.currentUser}>
                  {currentUser.first_name.charAt(0)}
                </button>
                <button className={styles.logoutBtn} onClick={onLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button className={styles.authBtn} onClick={onLoginClick}>
                  Log in
                </button>
              </li>
            )}
          </ul>
        </nav> */}
      </header>
    </>
  );
}

//   {isMenuOpen && (
//   <div className={styles.mobileOverlay}>
//     <button
//       className={styles.closeBtn}
//       onClick={toggleMobileMenu}
//       aria-label="Close menu"
//     >
//       <FontAwesomeIcon icon={faTimes} />
//     </button>
//     <div className={styles.mobileDrawer}>
//       <ul>
//         <li onClick={handleScrollToProperties}>Properties</li>
//         <li>
//           <Link to="/contacts" onClick={toggleMobileMenu}>
//             Contacts
//           </Link>
//         </li>
//         {currentUser ? (
//           <li>
//             <button onClick={onLogout}>Logout</button>
//           </li>
//         ) : (
//           <li>
//             <button onClick={onLoginClick}>Log in</button>
//           </li>
//         )}
//       </ul>
//     </div>
//   </div>
// )}

//   <nav className={styles.nav}>
//     {isMenuOpen && (
//       <>
//         <div
//           className={styles.overlay}
//           onClick={toggleMobileMenu}
//           aria-label="Close Menu"
//         >
//           <ul
//             className={styles.open}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <li>
//               <Link to="/" className={styles.navLink}>
//                 Properties
//               </Link>
//             </li>
//             <li>
//               <Link to="/contacts" className={styles.navLink}>
//                 Contacts
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </>
//     )}

//     {/* =======> Mobile container: visible up to 640px <======= */}
//     <div className="styles.mobileContainer">
//       {/* <button
//         className="cursor-pointer mt-4 bg-white rounded-full p-2 shadow"
//         onClick={toggleMenu}
//         aria-label="Toggle menu"
//       >
//         {hamburger}
//       </button> */}
//       <button
//         onClick={toggleMobileMenu}
//         className={styles.mobileMenuHamburger}
//         aria-label="Toggle menu"
//       >
//         <FontAwesomeIcon icon={faBars} />
//       </button>
//     </div>

//     <ul className={styles.desktopLinks}>
//       <li
//         className={styles.navLink}
//         onClick={() => handleClickOnProperties()}
//         ref={propertiesRefLargeScreens}
//       >
//         Properties
//       </li>
//     </ul>
//     <h1>
//       <Link to={`/`} className={styles.logo}>
//         AirBNC
//       </Link>
//     </h1>
//     <ul>

//       {currentUser ? (
//         <div>
//           <button className={styles.currentUser}>
//             {currentUser.first_name.charAt(0)}
//           </button>
//           {/* Hamburger menu */}
//           <button
//             onClick={toggleUserMenu}
//             className={styles.menuIcon}
//             aria-label="Toggle navigation"
//           >
//             <FontAwesomeIcon icon={faBars} />
//           </button>
//           {isUserMenuOpen && (
//             <>
//               <div
//                 className={styles.overlayUserModal}
//                 onClick={toggleUserMenu}
//                 aria-label="Close Menu"
//               >
//                 <ul
//                   className={styles.open}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <li>
//                     <Link to="/" className={styles.navLink}>
//                       Properties
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/contacts" className={styles.navLink}>
//                       Contacts
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </>
//           )}
//           <button className={styles.logoutBtn} onClick={onLogout}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <li>
//           <button className={styles.authBtns} onClick={onLoginClick}>
//             Log in
//           </button>
//         </li>
//       )}
//     </ul>
//   </nav>
