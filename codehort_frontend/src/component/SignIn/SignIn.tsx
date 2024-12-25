import React, { useState, FormEvent } from 'react';
import { auth } from "../../firebase.js"
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css'; // Import the correct CSS module
import Footer from '../Footer/Footer.tsx';

const SignIN: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const signIn = async (e: FormEvent) => {
        e.preventDefault();

        // Validation: Check if email is empty
        if (!email) {
            setEmailError("Please enter your email");
            return;
        }

        // Validation: Check if password is empty
        if (!password) {
            setPasswordError("Please enter your password");
            return;
        }

        setLoading(true);

        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate('/home');
        } catch (error) {
            setPasswordError("Failed to log in");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value) setEmailError(""); // Clear email error when email field is not empty
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (value) setPasswordError(""); // Clear password error when password field is not empty
    };

    return (
        <div className={styles['pageLayout']}>
            <div className={styles.logo}>
                <a href="/home">
                    <img src={require('../../assets/images/codehort-logo.png')} alt="Codehort Logo" />
                </a>
            </div>
            <div className={styles['sign-in-page']}>
                <div className={styles['sign-in-container']}> {/* Use the correct CSS module class */}
                    <form onSubmit={signIn}>
                        <h1>Log In</h1>
                        <div className={styles['input-container']}>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {emailError && <div className={styles['error-message']}>{emailError}</div>} {/* Display error message for email */}
                        </div>
                        <div className={styles['input-container']}>
                            <input
                                type='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <div className={styles['error-message']}>{passwordError}</div>} {/* Display error message for password */}
                        </div>
                        <div className={styles['button-container']}>
                            <button type='submit' className={styles['action-button']} disabled={loading}>Log In</button> {/* Use the correct CSS module class */}
                        </div>
                    </form>
                    <div>Need an account? <Link to="/signup">Sign Up</Link></div>
                </div>
                <div className={styles.imageContent}>
                    <img src={require('../../assets/images/cohero.png')} alt="Codehort Visualization" />
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default SignIN;
