import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import { auth } from "../../firebase";
import Footer from '../Footer/Footer.tsx';
import config from '../../config.json';
import { useAuth } from '../../AuthDetails.js';
import styles from './EditProfile.module.css'

const EditProfile: React.FC = () => {
    const { userEmailId } = useParams();
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [linkedinURL, setLinkedinURL] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetch(config.urls.base_url + 'users/getUserById/' + userEmailId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFirstname(data.firstName);
                setLastname(data.lastName);
                setEmail(data.email);
                setLinkedinURL(data.linkedinUrl);
                setBio(data.bio);

                const isEditAllowed = currentUser.email == data.email;
                console.log('allowed= ' + userEmailId)
                setIsEditMode(isEditAllowed);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const editProfile = (e: FormEvent) => {
        e.preventDefault();

        const userData = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            bio: bio,
            linkedinUrl: linkedinURL
        };

        fetch(config.urls.base_url + 'users/updateUser/' + currentUser.email, {
            method: 'PUT',
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
                console.log('User profile updated successfully:', data);
                alert('User profile updated successfully');
                navigate('/profile/' + currentUser.email);
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
                alert('Failed to update user profile');
            });
    };

    const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(e.target.value);
    };

    const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(e.target.value);
    };

    const handleLinkedinURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkedinURL(e.target.value);
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(e.target.value);
    };

    return (
        <div className={styles["profile-container"]}>
            <Header />
            <div className={styles["profile-page-cont"]}>
                {isEditMode ? (
                    <div className={styles["profile-page"]}>
                        <div>
                            <form onSubmit={editProfile}>
                                <h1 className={styles["profile-page-heading"]}>Edit Profile</h1>
                                <div className={styles["form-group"]}>
                                    <label htmlFor="firstname" className={styles["form-label"]}>First Name:</label>
                                    <input
                                        type='text'
                                        id="firstname"
                                        placeholder='First Name'
                                        value={firstname}
                                        onChange={handleFirstnameChange}
                                        className={styles["form-input"]}
                                    />
                                </div>
                                <div className={styles["form-group"]}>
                                    <label htmlFor="lastname" className={styles["form-label"]}>Last Name:</label>
                                    <input
                                        type='text'
                                        id="lastname"
                                        placeholder='Last Name'
                                        value={lastname}
                                        onChange={handleLastnameChange}
                                        className={styles["form-input"]}
                                    />
                                </div>
                                <div className={styles["form-group"]}>
                                    <label htmlFor="linkedinURL" className={styles["form-label"]}>LinkedIn URL:</label>
                                    <input
                                        type='text'
                                        id="linkedinURL"
                                        placeholder='LinkedIn URL'
                                        value={linkedinURL}
                                        onChange={handleLinkedinURLChange}
                                        className={styles["form-input"]}
                                    />
                                </div>
                                <div className={styles["form-group"]}>
                                    <label htmlFor="bio" className={styles["form-label"]}>Bio:</label>
                                    <textarea
                                        id="bio"
                                        placeholder='Bio'
                                        value={bio}
                                        onChange={handleBioChange}
                                        className={styles["form-textarea"]}
                                    />
                                </div>
                                <button type='submit' className={styles["form-button"]}>Save Changes</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className={styles["profile-page-edit"]}>
                        <div>
                            <h1 className={styles["profile-page-heading"]}>{firstname} {lastname}</h1>
                            <div className={styles["profile-info"]}>
                                <div className={styles["profile-info-item"]}>
                                    <span className={styles["profile-info-label"]}>Email:</span>
                                    <span className={styles["profile-info-value"]}>{email}</span>
                                </div>
                                <div className={styles["profile-info-item"]}>
                                    <span className={styles["profile-info-label"]}>LinkedIn:</span>
                                    <span className={styles["profile-info-value"]}>
                                        {linkedinURL ? (
                                            <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
                                                {linkedinURL}
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </span>
                                </div>
                                <div className={styles["profile-info-item"]}>
                                    <span className={styles["profile-info-label"]}>Bio:</span>
                                    <span className={styles["profile-info-value"]}>{bio || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default EditProfile;