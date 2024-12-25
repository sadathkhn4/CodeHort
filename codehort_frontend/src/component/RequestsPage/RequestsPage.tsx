import React, { FC, useState, useEffect } from 'react';
import styles from './RequestsPage.module.css';
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';
import { useAuth } from '../../AuthDetails.js';
import config from '../../config.json';

interface Request {
  requestId: number;
  requester: string;
  adminId: string;
  reqStatus: string;
  groupId: number;
  requesterName: string;
  groupName: string;
  reqNote: string;
}

interface RequestsPageProps { }

const RequestsPage: FC<RequestsPageProps> = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [currentRequestId, setCurrentRequestId] = useState<number | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(config.urls.base_url + 'requests/' + currentUser.email);
      const data = await response.json();
      setRequests(data.filter((req: Request) => req.reqStatus === 'Pending' || req.reqStatus === 'Rejected'));
    };

    fetchData();
  }, []);

  const filteredRequestsSent = requests.filter(req => req.requester === currentUser.email);
  const filteredRequestsReceived = requests.filter(req => req.adminId === currentUser.email);

  const handleAccept = async (requestId: number) => {
    try {
      const response = await fetch(config.urls.base_url + 'requests/' + requestId + '/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = '/requests';
      } else {

        console.error('Failed to accept request');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleReject = async (requestId: number, note: string) => {
    try {
      const response = await fetch(config.urls.base_url + 'requests/' + requestId + '/deny', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reqNote: note })
      });

      if (response.ok) {
        window.location.href = '/requests';
      } else {
        console.error('Failed to reject request');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const openModal = (requestId: number) => {
    setShowModal(true);
    setCurrentRequestId(requestId);
  };

  const closeModal = () => {
    setShowModal(false);
    setNote('');
  };

  return (
    <div className={styles.requestpage} data-testid="RequestsPage">
      <Header />
      <div className={styles.container}>
        <section className={styles.reqSection}>
          <div className={styles.reqSectionTitle}>Received Requests</div>
          {filteredRequestsReceived.length === 0 ? (
            <div className={styles.reqSectionTitle}>No received requests</div>
          ) : (
            <ul className={styles.requestList}>
              <li className={styles.header}>
                <span className={styles.columnHeader}>Group</span>
                <span className={styles.columnHeader}>Requester</span>
                <span className={styles.columnHeader}>Status</span>
                <span className={styles.columnHeader}>Actions</span>
              </li>
              {filteredRequestsReceived.map(req => (
                <li key={req.requestId} className={styles.requestItem}>
                  <div className={styles.column}>{req.groupName}</div>
                  <div className={styles.column}>{req.requesterName}</div>
                  <div className={styles.column}>{req.reqStatus}</div>
                  <div className={styles.column}>
                    <button className={styles.acceptButton} onClick={() => handleAccept(req.requestId)}>
                      Accept
                    </button>
                    <button className={styles.rejectButton} onClick={() => openModal(req.requestId)} disabled={req.reqStatus === 'Rejected'}>
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <hr />
        <section className={styles.reqSection}>
          <div className={styles.reqSectionTitle}>Requests Sent</div>
          {filteredRequestsSent.length === 0 ? (
            <div className={styles.reqSectionTitle}>No sent requests</div>
          ) : (
            <ul className={styles.requestList}>
              <li className={styles.header}>
                <span className={styles.columnHeader}>Group</span>
                <span className={styles.columnHeader}>Status</span>
                <span className={styles.columnHeader}>Note</span>
              </li>
              {filteredRequestsSent.map(req => (
                <li key={req.requestId} className={styles.requestItem}>
                  <div className={styles.column}>{req.groupName}</div>
                  <div className={styles.column}>{req.reqStatus}</div>
                  <div className={styles.column}>{req.reqNote ? req.reqNote : '-'}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      {showModal && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-content']}>
            <div className={styles['modal-title']}>Confirm Rejection</div>
            <textarea
              placeholder="Rejection Note"
              className={styles['reject-note-input']}
              maxLength={25}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className={styles['modal-actions']}>
              <button onClick={() => handleReject(currentRequestId ? currentRequestId : 0, note)} className={styles['create-btn']}  >
                <i className="fas fa-check"></i> Reject
              </button>

              <button onClick={() => closeModal()} className={styles['cancel-btn']}>
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RequestsPage;
