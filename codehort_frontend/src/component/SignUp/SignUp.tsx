import React, { useState, FormEvent } from 'react';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css'; // Import the CSS module
import Footer from '../Footer/Footer.tsx';
import config from '../../config.json';

const SignUp: React.FC = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [reenterPassword, setReenterPassword] = useState<string>('');
    const [linkedinURL, setLinkedinURL] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [firstnameError, setFirstnameError] = useState<string>('');
    const [lastnameError, setLastnameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [reenterPasswordError, setReenterPasswordError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signUp = (e: FormEvent) => {
        e.preventDefault();

        // Add validations
        if (!firstname) {
            setFirstnameError("Please enter your First name");
            return;
        }
        if (!lastname) {
            setLastnameError("Please enter your Last name");
            return;
        }
        if (!email) {
            setEmailError("Please enter your email");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setPasswordError("Please enter your password");
            return;
        }
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        }
        if (password !== reenterPassword) {
            setReenterPasswordError("Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                console.log(userCredential);

                const userData = {
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    bio: bio,
                    linkedinUrl: linkedinURL
                };

                fetch(config.urls.base_url + 'users/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('API Response:', data);
                        navigate('/signin');
                    })
                    .catch(error => {
                        console.error('Error calling API:', error);
                    });
            }).catch((error: any) => {
                console.log(error);
            });
    };

    const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFirstname(value);
        if (value) setFirstnameError(""); // Clear firstname error when firstname field is not empty
    };
    const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLastname(value);
        if (value) setLastnameError(""); // Clear lastname error when lastname field is not empty
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

    const handleReenterPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setReenterPassword(value);
        if (value) setReenterPasswordError(""); // Clear reenter password error when reenter password field is not empty
    };

    return (
        <div className={styles['pageLayout']}>
            <div className={styles.logo}>
                <a href="/home">
                    <img src={require('../../assets/images/codehort-logo.png')} alt="Codehort Logo" />
                </a>
            </div>
            <div className={styles['sign-up-page-cont']}>
                <div className={styles['sign-up-page']}>
                    <div className={styles['sign-up-container']}>
                        <form onSubmit={signUp}>
                            <h1>Create Account</h1>
                            <div className={styles['input-container']}>
                                <input type='text'
                                    placeholder='First Name'
                                    value={firstname}
                                    onChange={handleFirstnameChange}
                                />
                                {firstnameError && <div className={styles['error-message']}>{firstnameError}</div>} {/* Display error message for firstname */}


                            </div>
                            <div className={styles['input-container']}>
                                <input type='text'
                                    placeholder='Last Name'
                                    value={lastname}
                                    onChange={handleLastnameChange}
                                />
                                {lastnameError && <div className={styles['error-message']}>{lastnameError}</div>} {/* Display error message for lastname */}
                            </div>
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
                            <div className={styles['input-container']}>
                                <input
                                    type='password'
                                    placeholder='Re-enter your password'
                                    value={reenterPassword}
                                    onChange={handleReenterPasswordChange}
                                />
                                {reenterPasswordError && <div className={styles['error-message']}>{reenterPasswordError}</div>} {/* Display error message for reentered password */}
                            </div>
                            <div className={styles['input-container']}>
                                <input type='text' placeholder='Enter your LinkedIn URL (Optional)'
                                    value={linkedinURL}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkedinURL(e.target.value)}
                                /></div>
                            <div className={styles['input-container']}>
                                <textarea placeholder='Enter your bio (Optional)'
                                    value={bio}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                                /></div>
                            <button type='submit' className={styles['action-button']}>Sign Up</button>
                        </form>
                        <div>Already have an account? <Link to="/signin">Log In</Link></div>
                    </div>
                    <div className={styles.imageContent}>
                        <img src={require('../../assets/images/cohero.png')} alt="Codehort Visualization" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default SignUp;
