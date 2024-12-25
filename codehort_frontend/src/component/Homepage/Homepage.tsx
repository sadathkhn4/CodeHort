import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';
import styles from './Homepage.module.css';
import { useAuth } from '../../AuthDetails.js';
import CreateChallenge from '../CreateChallenge/CreateChallenge.tsx';

interface HomepageProps { }

const Homepage: FC<HomepageProps> = () => {

    const { currentUser } = useAuth()
    const navigate = useNavigate(); // Initialize the navigate function
    const handleExploreGroupsClick = () => {
        navigate('/groups'); // Redirect to the '/groups' page
    };

    return (
        <div className={styles.homeCont}>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <h1>Welcome to Codehort</h1>
                        <p>
                            Embark on your coding journey with us and discover the power of collaborative learning. Join groups, tackle challenges together, and track your progress as you grow. Whether you're a coding enthusiast eager to enhance your skills or a beginner looking for guidance, CodeHort provides the perfect platform to learn and thrive. Join our vibrant community today and unlock endless possibilities in the world of coding!
                        </p>
                        <div className={styles.ctaButtonContainer}>
                            <button className={styles.ctaButton} onClick={handleExploreGroupsClick}>
                                <span className={styles.ctaLabel}>Explore Groups</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.imageContent}>
                        <img src={require('../../assets/images/cohero.png')} alt="Codehort Visualization" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;
