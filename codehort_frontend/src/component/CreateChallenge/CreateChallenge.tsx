import React, { useState } from 'react';
import styles from './CreateChallenge.module.css';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';

interface ChallengeData {
  name: string;
  rows: string[][];
}

interface Props {
  groupId: string;
}

const CreateChallenge: React.FC<Props> = ({ groupId }) => {
  const [showModal, setShowModal] = useState(false);
  const [challengeName, setChallengeName] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (challengeData) {
      console.log(challengeData);
      console.log(challengeName);

      const createChallengeAndProblems = async () => {
        try {
          console.log("Inside submit button: ", groupId);
          // Call the first API to create the challenge
          const challengeResponse = await fetch(config.urls.base_url + 'challenges', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ challengeName: challengeName, groupId: groupId }),
          });

          if (challengeResponse.ok) {
            const challengeId = await challengeResponse.json();
            console.log(challengeId);

            // Prepare the problem data
            const problems = challengeData.rows.slice(1).map((row) => ({
              problemName: row[0],
              leetcodeLink: row[1],
              challengeId,
            }));

            // Call the second API to create problems
            const problemsResponse = await fetch(config.urls.base_url + 'problems', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(problems),
            });
            console.log(problems);

            if (problemsResponse.ok) {
              console.log('Challenge and problems created successfully');
              navigate(0);

            } else {
              console.error('Failed to create problems');
            }
          } else {
            console.error('Failed to create challenge');
          }
        } catch (error) {
          console.error('Error:', error);
        }

        // Reset the state after creating the challenge
        setChallengeName('');
        setCsvFile(null);
        setChallengeData(null);
        setShowModal(false);
      };

      createChallengeAndProblems();
    }
  }, [challengeData, groupId, challengeName]);

  const handleCreateChallenge = async () => {
    await parseCSV();
    // console.log(challengeData);
    // console.log(challengeName);
    // await new Promise(r => setTimeout(r, 5000));

    // if (challengeData) {
    //   try {
    //     console.log("Inside submit button: ", groupId);
    //     // Call the first API to create the challenge
    //     const challengeResponse = await fetch(config.urls.base_url + 'challenges', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ challengeName: challengeName, groupId: groupId }),
    //     });

    //     if (challengeResponse.ok) {
    //       const challengeId = await challengeResponse.json();
    //       console.log(challengeId);

    //       // Prepare the problem data
    //       const problems = challengeData.rows.slice(1).map((row) => ({
    //         problemName: row[0],
    //         leetcodeLink: row[1],
    //         challengeId,
    //       }));

    //       // Call the second API to create problems
    //       const problemsResponse = await fetch(config.urls.base_url + 'problems', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(problems),
    //       });
    //       console.log(problems);

    //       if (problemsResponse.ok) {
    //         console.log('Challenge and problems created successfully');
    //       } else {
    //         console.error('Failed to create problems');
    //       }
    //     } else {
    //       console.error('Failed to create challenge');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // }

    // // Reset the state after creating the challenge
    // setChallengeName('');
    // setCsvFile(null);
    // setChallengeData(null);
    // setShowModal(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setCsvFile(file || null);
  };

  const parseCSV = () => {
    return new Promise<void>((resolve) => {
      if (csvFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const csvData = reader.result as string;
          const rows = csvData.trim().split('\n').map((row) => row.split(','));
          if (rows.length > 0 && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === '') {
            rows.pop();
          }
          setChallengeData({ name: challengeName, rows });
          console.log('Parsed rows:', rows);
          resolve();
        };
        reader.readAsText(csvFile);
      } else {
        resolve();
      }
    });
  };




  return (
    <div className={styles['create-challenge-container']}>
      <button onClick={() => setShowModal(true)} className={styles['create-challenge-btn']}>
        <i className="fas fa-plus"></i> Create Challenge
      </button>

      {showModal && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-content']}>
            <input
              type="text"
              placeholder="Challenge Name"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
              className={styles['challenge-name-input']}
            />
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className={styles['file-input']}
            />
            {/* <button onClick={parseCSV} className={styles['parse-btn']} disabled={!csvFile}>
              <i className="fas fa-file-csv"></i> Parse CSV
            </button> */}
            <div className={styles['modal-actions']}>
              <button onClick={handleCreateChallenge} className={styles['create-btn']} disabled={!csvFile || !challengeName}>
                <i className="fas fa-check"></i> Create
              </button>
              <button onClick={() => setShowModal(false)} className={styles['cancel-btn']}>
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChallenge;