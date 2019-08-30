import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
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

const StyledSongText = styled.div`
    flex: 1 1;
    margin: 0 10px;
`;

const NotificationItem = ({
    notification: { action, fromUsername, image, date }
}) => {
    const renderSummary = () => {
        if (action === 'Follow') {
            return (
                <span>
                    <Link to={`/${fromUsername}`}>{fromUsername}</Link>
                    {` started listening to you.`}
                </span>
            );
        } else if (action === 'Like') {
            return (
                <span>
                    <Link to={`/${fromUsername}`}>{fromUsername}</Link>
                    {` liked your post.`}
                </span>
            );
        }
    };

    return (
        <StyledItem>
            <img
                alt={fromUsername}
                src={`${image}`}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%'
                }}
            ></img>
            <StyledSongText>
                <div style={{ color: 'rgba(120, 120, 120, 0.87)' }}>
                    {moment(date, moment.ISO_8601).fromNow()}
                </div>
                {renderSummary()}
            </StyledSongText>
        </StyledItem>
    );
};

export default NotificationItem;
