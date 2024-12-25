import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>About</h3>
          <p>Codehort is a collaborative learning platform developed by Anuj, Pranith, Sadath, Varshita, and Vineeth.</p>
        </div>
        <div className={styles.footerSectionCenter}>
          <h3>Contact Us</h3>
          <p><i className="fas fa-phone"></i>(123) 456-7890</p>
          <p><i className="fas fa-envelope"></i>contactus@codehort.com</p>
        </div>
        <div className={styles.footerSectionRight}>
          <h3>Address</h3>
          <p>14408 Stroubles Creek Rd<br />Blacksburg, VA 24060<br />United States</p>
        </div>
      </div>
      <div className={styles.socialIcons}>
        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
      </div>
      <div className={styles.copyright}>
        <p>&copy; All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
