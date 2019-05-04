import React, { useEffect } from 'react';
import NewUserListItem from './NewUserListItem';

const NewUserList = ({ users, fetchList }) => {

    useEffect(() => {
        console.log('Mounted', users);
        // fetchList();
    }, [])

    if (!users) {
        return null;
    } else {
        return <div>{users.map(user => 
            <NewUserListItem user={user} />
        )}</div>
    }

}

export default NewUserList;