import styles from "./styles/Signup.module.css";

export default function Signup({ setIsSignupModalOpen }) {

    function handleCloseSignupModal() {
        setIsSignupModalOpen(false);
    };

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
                        <label className={styles.signupFormLabel}> Email:
                            <input 
                                type="text"
                                className={styles.signupFormInput}
                                placeholder="Type in your email"
                                required
                            />
                        </label>
                        <label className={styles.signupFormLabel}> Password:
                            <input 
                                type="text"
                                className={styles.signupFormInput}
                                placeholder="Type in your password"
                                required
                            />
                        </label>
                        <input 
                            type="submit" 
                            value="Sign up" 
                            className={styles.signupBtn}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}