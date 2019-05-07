import React from 'react';
import { Link } from 'react-router-dom';

const NewUserListItem = ({ user }) => {
    console.log(user);
    if (user) {
        return (
            <div className="event">
                <div className="label">
                    <Link to={`/${user.username}`} >
                        <img 
                            alt={user.username} 
                            src={user.profileImage}
                            style={{width: '40px'}}
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

export default NewUserListItem;