import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    isFetching,
    fetchNotifications,
    viewNotifications,
    haveNewNotifications
} from '../../../actions';
import './Notifications.css';
import NotificationList from './NotificationList';
import socket from '../../../utils/socketClient';

class Notifications extends Component {
    async componentDidMount() {
        this.props.isFetching(true);

        await this.props.viewNotifications();
        this.props.fetchNotifications();
        this.props.haveNewNotifications();
        this.props.isFetching(false);

        socket.on('notification', () => {
            this.props.fetchNotifications();
        });
    }

    render() {
        const { notifications, fetching } = this.props;
        return (
            <div>
                <div>
                    <h1>Notifications</h1>
                </div>
                {fetching ? (
                    <div>Loading...</div>
                ) : (
                    <NotificationList notifications={notifications} />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ notifications, fetching }) => {
    return { notifications, fetching };
};

export default connect(
    mapStateToProps,
    { isFetching, fetchNotifications, viewNotifications, haveNewNotifications }
)(Notifications);
