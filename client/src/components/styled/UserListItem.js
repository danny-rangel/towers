import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledUserText = styled.div`
    flex: 1 1;
    margin: 0 10px;
`;

const UserListItem = ({ user }) => {
    return (
        <StyledItem>
            <Link to={`/${user.username}`}>
                <img
                    alt={user.username}
                    src={user.image}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                    }}
                ></img>
            </Link>
            <StyledUserText>
                <Link to={`/${user.username}`}>{user.username}</Link>
            </StyledUserText>
        </StyledItem>
    );
};

export default UserListItem;
