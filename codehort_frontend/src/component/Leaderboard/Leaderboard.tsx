import React, { FC, useState } from 'react';

import styles from "./Leaderboard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface LeaderboardEntry {
  userId: number;
  username: string;
  problemsSolved: number;
  email: string;
}

interface LeaderboardProps {
  leaderboardData: LeaderboardEntry[];
  currentUserRank: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardData, currentUserRank }) => {
  const [showAdditionalRanks, setShowAdditionalRanks] = useState(false);
  const navigate = useNavigate();

  const toggleAdditionalRanks = () => {
    setShowAdditionalRanks(!showAdditionalRanks);
  };

  const handleProfile = (email: string) => {
    console.log('hello')
    navigate('/profile/' + email)
  };

  console.log('Current User Rank (from Leaderboard):', currentUserRank);

  return (
    <div className={styles.leaderboard}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {showAdditionalRanks
            ? leaderboardData.map((entry, index) => {
              console.log('Row Index:', index + 1);
              return (
                <tr
                  key={entry.userId}
                  className={index === currentUserRank - 1 ? styles.currentUser : ""}
                >
                  <td>{index + 1}</td>
                  <td>
                    <a onClick={() => handleProfile(entry.email)}>{entry.username}</a>
                  </td>
                  <td>{entry.problemsSolved}</td>
                </tr>
              );
            })
            : leaderboardData.slice(0, 3).map((entry, index) => {
              console.log('Row Index:', index + 1);
              return (
                <tr
                  key={entry.userId}
                  className={index === currentUserRank - 1 ? styles.currentUser : ""}
                >
                  <td>{index + 1}</td>
                  <td><a onClick={() => handleProfile(entry.email)}>{entry.username}</a></td>
                  <td>{entry.problemsSolved}</td>
                </tr>
              );
            })}
          <tr className={styles['toggle-row']}>
            <td colSpan={3}>
              <span onClick={toggleAdditionalRanks}>
                <FontAwesomeIcon
                  icon={showAdditionalRanks ? faAngleDoubleUp : faAngleDoubleDown}
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;