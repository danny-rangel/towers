import React, { useEffect } from 'react';
import UserListItem from './UserListItem';
import { fetchPostLikes, isFetching } from '../../../actions';
import { connect } from 'react-redux';
import '../notifications/Notifications.css';

const UserList = ({ fetching, isFetching, fetchPostLikes, match, users }) => {
    useEffect(() => {
        const fetchLikes = async () => {
            isFetching(true);
            await fetchPostLikes(match.params.id);
            isFetching(false);
        };

        fetchLikes();
    }, []);

    const renderList = () => {
        if (users) {
            return users.map(user => {
                return <UserListItem key={user._id} user={user} />;
            });
        } else {
            return <div>No results found</div>;
        }
    };

    return (
        <>
            <h1>Likes</h1>
            {fetching ? <div></div> : renderList()}
        </>
    );
};

const mapStateToProps = ({ users, fetching }) => {
    return {
        users,
        fetching
    };
};

export default connect(
    mapStateToProps,
    { fetchPostLikes, isFetching }
)(UserList);
