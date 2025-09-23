import styles from "./styles/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

export default function Login({ setIsLoginModalOpen, onSignupClick }) {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleCloseLoginModal() {
    setIsLoginModalOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    };

    handleLogin(email, password)
      .then((res) => {
        console.log(res.user)
        handleCloseLoginModal();
        navigate(`/users/${res.user.user_id}`);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || "Login failed");
      });
  }

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginFormInput}
                placeholder="Type in your password"
                required
              />
            </label>

            {error && <p className={styles.loginError}>{error}</p>}

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
