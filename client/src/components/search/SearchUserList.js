import React from 'react';
import UserListItem from '../UserListItem';
import { connect } from 'react-redux';
import '../notifications/Notifications.css';

const SearchUserList = ({ searchedUsers }) => {

    const renderList = () => {
        if (searchedUsers) {
            if (searchedUsers.length === 0) {
                return <div>No users found</div>
            }

            return searchedUsers.map(user => {
                return (
                    <UserListItem 
                        key={user._id} 
                        user={user}
                    />
                );
            });
        }  else {
            return null;
        }
    }


    return (
        <div className="ui container" id="notificationSection" >
            <div className="ui feed" id="notificationFeed">
                {renderList()}
            </div>
        </div>
    );
}

const mapStateToProps = ({ searchedUsers }) => {
    return {
        searchedUsers
    };
}

export default connect(mapStateToProps)(SearchUserList);