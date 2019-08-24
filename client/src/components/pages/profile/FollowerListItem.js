import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FollowerListItem extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="event">
                <div className="label">
                    <Link to={`/${user.personFollowingUsername}`} >
                        <img 
                            alt={user.personFollowingUsername} 
                            src={`${user.personFollowingImage}`}
                            style={{width: '40px'}}    
                        >
                        </img>
                    </Link>
                </div>
                <div className="content">
                    <Link to={`/${user.personFollowingUsername}`} style={{color: 'white', fontSize: '2rem'}}>{user.personFollowingUsername}</Link>
                </div>
            </div>
        );
    }
}

export default FollowerListItem;

