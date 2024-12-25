import React, { FC, useEffect, useState } from "react";
import styles from "./Group.module.css";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import { useParams } from "react-router-dom";
import CreateChallenge from "../CreateChallenge/CreateChallenge.tsx";
import config from '../../config.json';
import { useAuth } from '../../AuthDetails.js';
import CircleProgress from "../Challenges/ProgressChart.tsx"
import { useNavigate } from 'react-router-dom';


interface GroupProps {
  groupName: string;
}

interface Challenge {
  challengeId: number;
  challengeName: string;
  groupId: number;
  totalProblems: number;
  solvedProblems: number;
}

const Group: React.FC<GroupProps> = (groupName) => {
  const { groupid } = useParams();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { currentUser } = useAuth();
  const [total, setTotal] = useState(0);
  const [solved, setSolved] = useState(0);
  const [TotalProb, setTotalProb] = useState<number>(0);
  const [TotalSolv, setTotalSolv] = useState<number>(0);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(config.urls.base_url + 'challengesByGroup/' + groupid + '/' + currentUser.email);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setChallenges(data);

        const totalProb = data.reduce((sum, challenge) => sum + challenge.totalProblems, 0);
        const totalSolv = data.reduce((sum, challenge) => sum + challenge.solvedProblems, 0);
        setTotalProb(totalProb);
        setTotalSolv(totalSolv);

        setTotal(totalProb);
        setSolved(totalSolv);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  const handleMouseEnter = (max: number, value: number) => {
    setTotal(max);
    setSolved(value);
  };

  const handleMouseLeave = () => {
    setTotal(TotalProb);
    setSolved(TotalSolv);
  };

  const handleChallengeRedirect = (groupId: string, challengeId: number) => {
    navigate('../challenges/' + groupId + '/' + challengeId)
  }





  return (
    <div className={styles["group_body_cont"]}>
      <Header />
      <div className={styles["group_body"]}>
        <CreateChallenge groupId={groupid} />
        <div className={styles["groupContainer"]}>
          <div className={styles["chart"]}>
            <CircleProgress total={total} solved={solved} />
          </div>
          <div className={styles["listofchallenges"]}>
            {challenges.map(challenge => (
              <div key={challenge.challengeId} className={styles.challenge} >
                <a className={styles["prob"]} onClick={() => handleChallengeRedirect(groupid ? groupid : '0', challenge.challengeId)}>
                  <div
                    className={styles["challenge_tile"]}
                    onMouseEnter={() => handleMouseEnter(challenge.totalProblems, challenge.solvedProblems)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {challenge.challengeName}
                    <progress value={challenge.solvedProblems} max={challenge.totalProblems} />
                  </div>
                </a>
                <br></br>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Group;