import React, { useEffect } from 'react';
import NewUserListItem from './NewUserListItem';

const NewUserList = ({ users }) => {

    useEffect(() => {
        console.log('Mounted', users);
    }, [])

    if (!users) {
        return <div style={{color: 'white'}}>Hi</div>;
    } else {
        return (
            <>
                {users.map(user => 
                    <NewUserListItem user={user} />
                )}
            </>
        );

    }

}

export default NewUserList;