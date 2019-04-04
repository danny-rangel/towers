import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserListItem extends Component {

    render() {
        const { user } = this.props;
        return (
            <div className="event">
                <div className="label">
                    <Link to={`/${user.username}`} >
                        <img 
                            alt={user.username} 
                            src={user.profileImage}
                        >
                        </img>
                    </Link>
                </div>
                <div className="content" >
                    <Link to={`/${user.username}`} style={{color: 'white', fontSize: '2rem'}} >{user.username}</Link>
                </div>
            </div>
        );
    }
}

export default UserListItem;
