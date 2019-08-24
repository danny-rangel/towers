import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FollowingListItem extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="event">
                <div className="label">
                    <Link to={`/${user.personFollowedUsername}`} >
                        <img 
                            alt={user.personFollowedUsername} 
                            src={`${user.personFollowedImage}`}
                            style={{width: '40px'}}    
                        >
                        </img>
                    </Link>
                </div>
                <div className="content" >
                    <Link to={`/${user.personFollowedUsername}`} style={{color: 'white', fontSize: '2rem'}} >{user.personFollowedUsername}</Link>
                </div>
            </div>
        );
    }
}

export default FollowingListItem;