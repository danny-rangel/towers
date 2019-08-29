import React from 'react';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Loader from '../../styled/Loader';
import Paper from '@material-ui/core/Paper';

const StyledPaper = styled(Paper)`
    && {
        margin: 20px 0;
        width: 100%;
        min-height: 101px;
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

const SearchUserList = ({ searchedUsers, fetching }) => {
    const renderList = () => {
        if (searchedUsers) {
            if (searchedUsers.length === 0) {
                return <div>No users found</div>;
            }

            return searchedUsers.map(user => {
                return <UserListItem key={user._id} user={user} />;
            });
        } else {
            return null;
        }
    };

    if (fetching) {
        return <Loader width="40px" height="40px" />;
    } else if (!searchedUsers) {
        return null;
    } else {
        return <StyledPaper>{renderList()}</StyledPaper>;
    }
};

const mapStateToProps = ({ searchedUsers, fetching }) => {
    return {
        searchedUsers,
        fetching
    };
};

export default connect(mapStateToProps)(SearchUserList);
