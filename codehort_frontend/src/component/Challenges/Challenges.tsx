import React, { FC, useState, useEffect } from "react";
import styles from "./Challenges.module.css";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import { useParams } from "react-router-dom";
import config from '../../config.json';
import { useAuth } from "../../AuthDetails.js";
import Leaderboard from "../Leaderboard/Leaderboard.tsx";
import CircleProgress from "./ProgressChart.tsx";


interface ChallengesProps {
  challengeName: string;
}

interface Problem {
  problemId: number;
  problemName: string;
  leetcodeLink: string;
  challengeId: number;
  solved: boolean;
}

interface LeaderboardEntry {
  userId: number;
  username: string;
  problemsSolved: number;
  email: string;
  isCurrentUser: boolean;
}

const Challenges: React.FC<ChallengesProps> = (challengeName) => {
  const { challengeId } = useParams();
  const { groupId } = useParams();
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [problemsData, setProblemsData] = useState<Problem[]>([]);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const { currentUser } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number>(0);

  const findCurrentRank = (entryData: any, leaderboardData: LeaderboardEntry[]) => {
    // Sort the leaderboard data in descending order based on problemsSolved
    const sortedLeaderboard = leaderboardData.sort((a, b) => b.problemsSolved - a.problemsSolved);

    // Find the rank of the current user
    const currentUserRank = sortedLeaderboard.findIndex(
      (entry) => entry.email === entryData.email
    ) + 1;
    console.log(currentUserRank)
    // Return an object with the rank property
    // return {
    //   rank: currentUserRank,
    // };
    setCurrentUserRank(currentUserRank);
  };
  useEffect(() => {

    // Fetch data from the API
    const fetchData = async () => {

      try {
        const response = await fetch(config.urls.base_url + 'problems/' + groupId + '/' + challengeId + '/' + currentUser.email);
        const data = await response.json();
        setProblemsData(data);

        const initialCheckedItems = data.reduce((acc, problem) => {
          acc[problem.problemId] = problem.solved;
          return acc;
        }, {});
        setCheckedItems(initialCheckedItems);

        const initialSolvedCount = Object.values(initialCheckedItems).filter(Boolean).length;
        setSolvedCount(initialSolvedCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(config.urls.base_url + 'leaderboard/' + challengeId);
      const data = await response.json();
      console.log('API Response:', data);

      const formattedData: LeaderboardEntry[] = data.map((entry: any) => {
        const isCurrentUser = entry.email === currentUser.email;
        return {
          userId: entry.userId,
          username: entry.username,
          problemsSolved: entry.problemsSolved,
          email: entry.email,
          isCurrentUser: isCurrentUser,
          ...isCurrentUser ? findCurrentRank(entry, data) : {},
        };
      });

      setLeaderboardData(formattedData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  // Inside useEffect
  useEffect(() => {
    fetchLeaderboardData();
  }, [challengeId]);

  const handleCheckboxChange = async (problemId: number) => {



    const requestData = {
      groupId,
      challengeId,
      email: currentUser.email,
      problemId,
    }

    setCheckedItems((prevState) => ({
      ...prevState,
      [problemId]: !prevState[problemId],
    }));


    setSolvedCount((prevState) =>
      checkedItems[problemId] ? prevState - 1 : prevState + 1
    );



    try {

      if (checkedItems[problemId]) {
        await fetch(config.urls.base_url + 'problems/logUnsolved', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      } else {
        await fetch(config.urls.base_url + 'problems/logSolved', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      }
      await fetchLeaderboardData();
    } catch (error) {
      console.error('Error sending request:', error);
    }


  };

  const openLinkInNewTab = (link: string) => {
    const cleanedLink = link.trim();
    const fullLink = cleanedLink.startsWith("https://") ? cleanedLink : `https://${cleanedLink}`;
    window.open(fullLink, "_blank", "noopener,noreferrer");
  };



  return (
    <div className={styles["challenge_cont"]}>
      <Header />


      <div className={styles["challenge_body"]}>
        <div className={styles["dashboad"]}>

          <div className={styles["progressContainer"]}>
            <div className={styles["progressChart"]}>
              <CircleProgress total={problemsData.length} solved={solvedCount} />
            </div>
            <div className={styles["progressText"]}>
              <div className={styles["progressAttribute"]}>Your Rank: {currentUserRank} </div>
              <div className={styles["progressAttribute"]}>Total Problems: {problemsData.length}</div>
              <div className={styles["progressAttribute"]}>Solved Problems: {solvedCount}</div>

            </div>
          </div>


          <Leaderboard leaderboardData={leaderboardData} currentUserRank={currentUserRank} />
        </div>
        <div className={styles["challengesContainer"]}>
          <div className={styles["listofchallenges"]}>
            {problemsData.map((problem) => (
              <div key={problem.problemId} className={styles.challenge}>
                <div className={styles["challenge_tile"]}>
                  <span
                    className={styles["prob"]}
                    onClick={() => openLinkInNewTab(problem.leetcodeLink)}
                  >
                    {problem.problemName}
                  </span>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={checkedItems[problem.problemId]}
                    onChange={() => handleCheckboxChange(problem.problemId)}
                  />
                </div>
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

export default Challenges;