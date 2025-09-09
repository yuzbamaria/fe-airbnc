import styles from "./styles/Signup.module.css";

export default function Signup({ setIsSignupModalOpen }) {
  function handleCloseSignupModal() {
    setIsSignupModalOpen(false);
  }

  return (
    <>
      <div className={styles.signupModalBackground}>
        <div className={styles.signupModal}>
          <div className={styles.signupModalTop}>
            <p className={styles.signupModalHeading}>Register</p>
            <button
              className={styles.closeSignupModalIcon}
              onClick={handleCloseSignupModal}
            >
              &times;
            </button>
          </div>
          <form className={styles.signupForm}>
            {/* Email input field  */}
            <label className={styles.signupFormLabel}>
              {" "}
              Email:
              <input
                type="text"
                className={styles.signupFormInput}
                placeholder="Type in your email"
                required
              />
            </label>

            {/* Password input field */}
            <label className={styles.signupFormLabel}>
              {" "}
              Password:
              <input
                type="text"
                className={styles.signupFormInput}
                placeholder="Type in your password"
                required
              />
            </label>
            
            <label htmlFor="role" className={styles.signupFormLabel}>
              Choose Role:
            <select name="role" className={styles.roleDropdown}>
              <option value="" className={styles.signupFormInput}>Select role</option>
              <option value="guest" className={styles.signupFormInput}>Guest</option>
              <option value="host" className={styles.signupFormInput}>Host</option>
            </select>
            </label>

            <input type="submit" value="Sign up" className={styles.signupBtn} />
          </form>
        </div>
      </div>
    </>
  );
}
