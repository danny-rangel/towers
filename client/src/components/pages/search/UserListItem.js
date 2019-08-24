import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserListItem extends Component {
    render() {
        const { user } = this.props;
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
}

export default UserListItem;
