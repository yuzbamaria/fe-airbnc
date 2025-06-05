import styles from "./styles/Login.module.css";

export default function Login({ setIsLoginModalOpen, onSignupClick }) {

    function handleCloseLoginModal() {
        setIsLoginModalOpen(false);
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
                    <form className={styles.loginForm}>
                        <label className={styles.loginFormLabel}> Email:
                            <input 
                                type="text"
                                className={styles.loginFormInput}
                                placeholder="Type in your email"
                                required
                            />
                        </label>
                        <label className={styles.loginFormLabel}> Password:
                            <input 
                                type="text"
                                className={styles.loginFormInput}
                                placeholder="Type in your password"
                                required
                            />
                        </label>
                        <input 
                            type="submit" 
                            value="Log in" 
                            className={styles.loginBtn}
                        />
                    </form>
                    <div className={styles.signupLinkMenu}>
                        <p>Don't have an account?</p>
                        <button 
                            className={styles.signupLink} 
                            onClick={onSignupClick}> 
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};