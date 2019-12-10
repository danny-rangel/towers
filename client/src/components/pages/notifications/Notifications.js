import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    isFetching,
    fetchNotifications,
    viewNotifications,
    haveNewNotifications
} from '../../../actions';
import NotificationList from './NotificationList';
import socket from '../../../utils/socketClient';
import Wrapper from '../../styled/Wrapper';
import history from '../../../history';

const Notifications = ({
    notifications,
    fetching,
    isFetching,
    viewNotifications,
    fetchNotifications,
    haveNewNotifications,
    auth
}) => {
    useEffect(() => {
        if (auth) {
            if (auth.username === '') {
                history.push(`/edit/${auth._id}`);
            }
        }

        const fetchInfo = async () => {
            isFetching(true);
            await viewNotifications();
            fetchNotifications();
            haveNewNotifications();
            isFetching(false);
        };

        fetchInfo();
        socket.on('notification', () => {
            fetchNotifications();
        });
    }, []);

    return (
        <Wrapper>
            <h1 style={{ alignSelf: 'center' }}>Notifications</h1>
            <NotificationList
                notifications={notifications}
                fetching={fetching}
            />
        </Wrapper>
    );
};

const mapStateToProps = ({ notifications, fetching, auth }) => {
    return { notifications, fetching, auth };
};

export default connect(mapStateToProps, {
    isFetching,
    fetchNotifications,
    viewNotifications,
    haveNewNotifications
})(Notifications);
