import React from 'react';
import UserListItem from '../UserListItem';
import { connect } from 'react-redux';
import '../notifications/Notifications.css';

const SearchUserList = ({ searchedUsers, fetching }) => {

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


    if (fetching) {
        return <div className="ui active inverted centered inline loader" style={{margin: '200px auto'}}></div>
    } else if (!searchedUsers) {
        return null
    } else {
        return (
            <div className="ui container" id="notificationSection" >
                <div className="ui feed" id="notificationFeed">
                    {renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ searchedUsers, fetching }) => {
    return {
        searchedUsers, fetching
    };
}

export default connect(mapStateToProps)(SearchUserList);