import React, { useEffect, useState } from 'react';
import GroupTileComponent from '../GroupTileComponent/GroupTileComponent.tsx';
import styles from './GroupsPage.module.css';
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';
import SearchBar from '../SearchBar/SearchBar.tsx';
import { useAuth } from '../../AuthDetails.js';
import config from '../../config.json';

interface GroupData {
    groupId: number;
    groupName: string;
    groupInfo: string;
    adminEmail: string;
    joined: boolean;
    requested: boolean;
    memberCount: number;
}

const GroupsPage = () => {

    const [groupsData, setGroupsData] = useState<GroupData[]>([]);
    const [joinedGroups, setJoinedGroups] = useState<GroupData[]>([]);
    const [availableGroups, setAvailableGroups] = useState<GroupData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupInfo, setGroupInfo] = useState('');
    const { currentUser } = useAuth();



    useEffect(() => {
        fetchGroupsData()
            .then(data => {
                setGroupsData(data);
            })
            .catch(error => {
                console.error('Error fetching groups data:', error);
            });
    }, []);

    useEffect(() => {
        setJoinedGroups(groupsData.filter(group => group.joined));
        setAvailableGroups(groupsData.filter(group => !group.joined));
    }, [groupsData]);

    const fetchGroupsData = async () => {
        try {
            const response = await fetch(config.urls.base_url + 'groups/getGroupsByUserId/' + currentUser.email);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    };

    const handleSearch = (results: GroupData[]) => {
        setJoinedGroups(results.filter(group => group.joined));
        setAvailableGroups(results.filter(group => !group.joined));
    }

    const handleCreateNewGroup = () => {
        fetch(config.urls.base_url + 'groups/createGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupName: groupName,
                groupInfo: groupInfo,
                adminEmail: currentUser.email,
            }),
        })
            .then(response => response.json())
            .then(data => {
                fetchGroupsData()
                    .then(data => {
                        setGroupsData(data);
                    })
                    .catch(error => {
                        console.error('Error fetching groups data:', error);
                    });
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    function handleCloseModal(): void {
        setGroupInfo('');
        setGroupName('');
        setShowModal(false);
    }

    return (
        <div>
            <Header />
            <div>
                <div className={styles['groups-header']}>
                    <div>
                        <button className={styles['new-group-button']} onClick={() => setShowModal(true)}>Create New Group</button>
                    </div>
                    <div>
                        <SearchBar groupsData={groupsData} onSearch={handleSearch} />
                    </div>
                </div>

                <div className={styles['group-section']}>
                    <div className={styles['groups-title']}>My Groups</div>
                    <div className={styles['tile-container']}>
                        {joinedGroups.map(group => (
                            <GroupTileComponent
                                key={group.groupId}
                                groupId={group.groupId}
                                groupName={group.groupName}
                                memberCount={group.memberCount}
                                joined={group.joined}
                                requested={group.requested}
                            />
                        ))}
                    </div>
                </div>
                <hr />
                <div className={styles['group-section']}>
                    <div className={styles['groups-title']}>Available Groups</div>
                    <div className={styles['tile-container']}>
                        {availableGroups.map(group => (
                            <GroupTileComponent
                                key={group.groupId}
                                groupId={group.groupId}
                                groupName={group.groupName}
                                memberCount={group.memberCount}
                                joined={group.joined}
                                requested={group.requested}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {showModal && (
                <div className={styles['modal-overlay']}>
                    <div className={styles['modal-content']}>
                        <div className={styles['modal-title']}>Create New Group</div>
                        <input
                            type="text"
                            placeholder="Group Name"
                            className={styles['group-name-input']}
                            maxLength={25}
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />

                        <textarea
                            placeholder="Group Info"
                            className={styles['group-info-input']}
                            value={groupInfo}
                            maxLength={150}
                            onChange={(e) => setGroupInfo(e.target.value)}
                        />

                        <div className={styles['modal-actions']}>
                            <button onClick={() => handleCreateNewGroup()} className={styles['create-btn']} disabled={!groupName} >
                                <i className="fas fa-check"></i> Create Group
                            </button>

                            <button onClick={() => handleCloseModal()} className={styles['cancel-btn']}>
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

export default GroupsPage;
