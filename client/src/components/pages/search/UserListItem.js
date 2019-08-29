import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media from '../../styled/media';
import StyledButton from '../../styled/Button';

const StyledItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid #f0ecec;

    :nth-last-child(1) {
        border-bottom: none;
    }
`;

const StyledSongText = styled(Link)`
    flex: 1 1;
    margin: 0 10px;
`;

const UserListItem = ({ user }) => {
    return (
        <StyledItem>
            <Link to={`/${user.username}`}>
                <img
                    alt={user.username}
                    src={user.profileImage}
                    style={{ width: '80px', borderRadius: '50%' }}
                ></img>
            </Link>

            <StyledSongText to={`/${user.username}`}>
                <h4>{user.username}</h4>
            </StyledSongText>
        </StyledItem>
    );
};

export default UserListItem;
