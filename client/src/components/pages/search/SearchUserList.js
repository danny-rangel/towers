import React from 'react';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import '../notifications/Notifications.css';

const SearchUserList = ({ searchedUsers, fetching }) => {
    const renderList = () => {
        if (searchedUsers) {
            if (searchedUsers.length === 0) {
                return <div>No users found</div>;
            }

            return searchedUsers.map(user => {
                return <UserListItem key={user._id} user={user} />;
            });
        } else {
            return null;
        }
    };

    if (fetching) {
        return <div></div>;
    } else if (!searchedUsers) {
        return null;
    } else {
        return (
            <div>
                <div>{renderList()}</div>
            </div>
        );
    }
};

const mapStateToProps = ({ searchedUsers, fetching }) => {
    return {
        searchedUsers,
        fetching
    };
};

export default connect(mapStateToProps)(SearchUserList);
