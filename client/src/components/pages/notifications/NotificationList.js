import React, { Component } from 'react';
import NotificationItem from './NotificationItem';
import './NotificationList.css';

class NotificationList extends Component {
    renderNotifications() {
        const { notifications } = this.props;
        return notifications.map(notification => {
            return (
                <NotificationItem
                    key={notification._id}
                    notification={notification}
                />
            );
        });
    }

    render() {
        return <div>{this.renderNotifications()}</div>;
    }
}

export default NotificationList;
