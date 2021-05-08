import { auth, provider } from '../firebase';
import styles from '../styles/Login.module.css';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    };

    return (
        <div className={styles.cont}>
            <div className={styles.imgWrap}>
                <img
                    className={styles.img}
                    src="https://image.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg"
                    alt="login image"></img>
            </div>
            <div className={styles.authWrap}>
                <div className={styles.login}>
                    <h3 className={styles.title}>NextTranslate</h3>
                    <h2 className={styles.subtitle}>Your online dictionary</h2>
                    <p className={styles.muted}>
                        Join now for <span className={styles.loginSpan}>free</span>
                    </p>
                    <button className={styles.btn} onClick={signIn}>
                        Sign In
                    </button>
                </div>
            </div>
            <div className={styles.shape}>hi</div>
        </div>
    );
}

export default Login;
