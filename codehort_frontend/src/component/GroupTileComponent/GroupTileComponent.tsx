import React, { FC } from 'react';
import styles from './GroupTileComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthDetails';
import config from '../../config.json';

interface GroupTileComponentProps {
    groupName: string;
    memberCount: number;
    joined: boolean;
    requested: boolean;
    groupId: number;
}

const GroupTileComponent: React.FC<GroupTileComponentProps> = ({ groupId, groupName, memberCount, joined, requested }) => {
    let navigate = useNavigate();
    const { currentUser } = useAuth();


    function handleViewGroup(groupName: string): void {
        let path = `/groups/` + groupId;
        navigate(path);
        console.log(groupId);
    }

    function handleJoinGroup(groupId: number): void {

        const url = new URL(config.urls.base_url + 'requests/create');
        url.searchParams.append('groupId', groupId.toString());
        url.searchParams.append('requesterEmail', currentUser.email.toString());

        fetch(url.toString(), {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to join group');
                }
                return response.json();
            })
            .then(data => {
                alert('Request to Join Group - Successful');


                navigate(0);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to join group');
            });
    }

    const firstLetter = groupName.charAt(0).toUpperCase();

    const imageSource = require(`../../assets/images/${firstLetter}.png`).default;

    return (
        <div className={styles['group-tile']}>
            <div style={{ display: 'flex', justifyContent: 'right', flexDirection: 'column' }}>
                <div>
                    <img className={styles['group-image']} src={require('../../assets/images/' + firstLetter + '.png')} alt={groupName} />
                </div>
                <div className={styles['group-info']}>
                    <div className={styles['group-name']}>{groupName}</div>
                    <div className={styles['member-count']}>Members: {memberCount}</div>
                </div>
                {joined ? (
                    <button className={styles['join-button']} onClick={() => handleViewGroup(groupName)}>View Group</button>
                ) : requested ? (
                    <button className={styles['request-sent-button']} disabled>Request Sent</button>
                ) : (
                    <button className={styles['join-button']} onClick={() => handleJoinGroup(groupId)}>Join Group</button>
                )}

            </div>
        </div>
    );
};

export default GroupTileComponent;





