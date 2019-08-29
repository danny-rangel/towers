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

const ListenListItem = ({ user, listening }) => {
    return (
        <StyledItem>
            <Link
                to={
                    listening
                        ? `/${user.personFollowingUsername}`
                        : `/${user.personFollowedUsername}`
                }
            >
                <img
                    alt={
                        listening
                            ? `/${user.personFollowingUsername}`
                            : `/${user.personFollowedUsername}`
                    }
                    src={
                        listening
                            ? `${user.personFollowingImage}`
                            : `${user.personFollowedImage}`
                    }
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                    }}
                ></img>
            </Link>
            <StyledUserText>
                <Link
                    to={
                        listening
                            ? `/${user.personFollowingUsername}`
                            : `/${user.personFollowedUsername}`
                    }
                >
                    {listening
                        ? `${user.personFollowingUsername}`
                        : `${user.personFollowedUsername}`}
                </Link>
            </StyledUserText>
        </StyledItem>
    );
};

export default ListenListItem;
