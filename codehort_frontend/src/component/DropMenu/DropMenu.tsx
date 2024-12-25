import React, { FC } from 'react';
import styles from './DropMenu.module.css';

interface DropMenuProps {}


const DropMenu: React.FC = () => {
  return(
  <div className={styles.DropMenu} data-testid="DropMenu">
    <ul>
      <li>Profile</li>
      <li>SignOut</li>
    </ul>
  </div>
  );
};

export default DropMenu;
