import React from 'react';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import Loader from '../../styled/Loader';
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
        return <Loader width="40px" height="40px" />;
    } else if (!searchedUsers) {
        return null;
    } else {
        return <>{renderList()}</>;
    }
};

const mapStateToProps = ({ searchedUsers, fetching }) => {
    return {
        searchedUsers,
        fetching
    };
};

export default connect(mapStateToProps)(SearchUserList);
