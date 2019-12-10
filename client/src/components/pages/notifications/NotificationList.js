import React from 'react';
import NotificationItem from './NotificationItem';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Loader from '../../styled/Loader';

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

const NotificationList = ({ notifications, fetching }) => {
    const renderNotifications = () => {
        return notifications.map(notification => {
            return (
                <NotificationItem
                    key={notification._id}
                    notification={notification}
                />
            );
        });
    };

    if (fetching) {
        return <Loader height="40px" width="40px" />;
    } else if (!notifications) {
        return null;
    } else {
        return (
            <>
                {notifications.length === 0 ? (
                    <h3 style={{ margin: '20px' }}>No notifications</h3>
                ) : (
                    <StyledPaper>{renderNotifications()}</StyledPaper>
                )}
            </>
        );
    }
};

export default NotificationList;
