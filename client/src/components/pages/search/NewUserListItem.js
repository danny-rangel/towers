import React from 'react';
import { Link } from 'react-router-dom';

const NewUserListItem = ({ user }) => {
    if (user) {
        return (
            <div>
                <div>
                    <Link to={`/${user.username}`}>
                        <img
                            alt={user.username}
                            src={user.profileImage}
                            style={{ width: '40px' }}
                        ></img>
                    </Link>
                </div>
                <div>
                    <Link to={`/${user.username}`}>{user.username}</Link>
                </div>
            </div>
        );
    }
};

export default NewUserListItem;
