import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface Props {
    groupsData: GroupData[];
    onSearch: (results: GroupData[]) => void;
}

interface GroupData {
    groupId: number;
    groupName: string;
    groupInfo: string;
    adminEmail: string;
    joined: boolean;
    requested: boolean;
    memberCount: number;
}

const SearchBar: React.FC<Props> = ({ groupsData, onSearch }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filteredGroups = groupsData.filter(group =>
            group.groupName.toLowerCase().includes(query.toLowerCase())
        );
        onSearch(filteredGroups);
    };

    return (
        <div className={styles['search-bar-container']}>
            <form onSubmit={handleSubmit} className={styles['search-bar-form']}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    className={styles['search-bar-input']}
                />
                <button type="submit" className={styles['search-bar-button']} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
