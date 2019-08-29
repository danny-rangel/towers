import React from 'react';
import UserListItem from './UserListItem';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Loader from './Loader';

const StyledPaper = styled(Paper)`
    && {
        margin: 20px 0;
        width: 100%;
        min-height: 64px;
        max-width: 500px;
        box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.43);
        display: flex;
        flex-direction: column;
        padding: 0px;
        box-sizing: border-box;
        border-radius: 0px;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }
`;

const UserList = ({ users, fetching, listening = false, listener = false }) => {
    const renderListeners = () => {
        let userInfo;
        return users.map(user => {
            if (!listening && !listener) {
                userInfo = {
                    username: user.username,
                    image: user.profileImage
                };
            } else {
                if (listening) {
                    userInfo = {
                        username: user.personFollowingUsername,
                        image: user.personFollowingImage
                    };
                } else if (listener) {
                    userInfo = {
                        username: user.personFollowedUsername,
                        image: user.personFollowedImage
                    };
                }
            }
            return <UserListItem key={user._id} user={userInfo} />;
        });
    };

    if (fetching) {
        return <Loader height="40px" width="40px" />;
    } else if (!users) {
        return null;
    } else {
        return <StyledPaper>{renderListeners()}</StyledPaper>;
    }
};

export default UserList;
