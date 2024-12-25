import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuth } from '../../AuthDetails';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const { currentUser } = useAuth();

  const handleGroup = () => {
    navigate('/groups')
  };
  const handleRequest = () => {
    navigate('/requests')
  };
  const handleSignOut = () => {
    auth.signOut();
    navigate('/signin');
  };

  const handleProfile = () => {
    navigate('/profile/' + currentUser.email)
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="/home">
            <img src={require('../../assets/images/codehort-logo.png')} alt="Codehort Logo" />
          </a>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <a onClick={handleGroup}>Groups</a>
            </li>
            <li>
              <a onClick={handleRequest}>Requests</a>
            </li>
            <li
              ref={dropdownRef}
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
              className={styles.dropdown}
            >
              <a>Profile</a>
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <a onClick={handleProfile}>View Profile</a>
                  <a onClick={handleSignOut}>Sign Out</a>
                </div>

              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;