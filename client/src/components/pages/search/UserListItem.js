import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ user }) => {
    return (
        <>
            <Link to={`/${user.username}`}>
                <img
                    alt={user.username}
                    src={user.profileImage}
                    style={{ width: '40px' }}
                ></img>
            </Link>

            <Link to={`/${user.username}`}>{user.username}</Link>
        </>
    );
};

export default UserListItem;
