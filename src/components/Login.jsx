import styles from "./styles/Login.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoginModalOpen, onSignupClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUser, setRegisteredUser] = useState([]);
  const navigate = useNavigate();

  function handleCloseLoginModal() {
    setIsLoginModalOpen(false);
  }

  function fetchRegisteredUser() {
    axios
      .post(
        "https://be-airbnc-zw86.onrender.com/api/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const data = response.data;
        setRegisteredUser(data);
        navigate(`/users/${data.user.user_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    fetchRegisteredUser();
  };

  return (
    <>
      <div className={styles.loginModalBackground}>
        <div className={styles.loginModal}>
          <div className={styles.loginModalTop}>
            <p className={styles.loginModalHeading}>Welcome back to AirBNC</p>
            <button
              className={styles.closeLoginModalIcon}
              onClick={handleCloseLoginModal}
            >
              &times;
            </button>
          </div>
          {/* Login form */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label className={styles.loginFormLabel}>
              {" "}
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.loginFormInput}
                placeholder="Type in your email"
                required
              />
            </label>
            <label className={styles.loginFormLabel}>
              {" "}
              Password:
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginFormInput}
                placeholder="Type in your password"
                required
              />
            </label>
            <input type="submit" value="Log in" className={styles.loginBtn} />
          </form>
          <div className={styles.signupLinkMenu}>
            <p>Don't have an account?</p>
            <button className={styles.signupLink} onClick={onSignupClick}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
