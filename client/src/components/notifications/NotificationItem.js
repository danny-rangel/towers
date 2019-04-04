import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './NotificationItem.css';

class NotificationItem extends Component {

    renderSummary() {
        const { notification } = this.props;

        if (notification.action === "Follow") {
            return (
                <div className="summary" id="summaryText">
                    <Link to={`/${notification.fromUsername}`} style={{color: 'white'}} >
                        {notification.fromUsername}
                    </Link>
                    {` started listening to you.`}
                </div>
            );
        } else if (notification.action === "Like") {
            return(
                <div className="summary" id="summaryText">
                    <Link to={`/${notification.fromUsername}`} style={{color: 'white'}} >
                        {notification.fromUsername}
                    </Link>
                    {` liked your post.`}
                </div>
            );
        }
    }

    render() {
        const { notification } = this.props;
        return (
            <div className="event">
                <div className="label">
                    <img 
                        alt={notification.fromUsername} 
                        src={`${notification.image}`}>
                    </img>
                </div>
                <div className="content">
                    <div className="date" id="dateText" >
                        {moment(notification.date, moment.ISO_8601).fromNow()}
                    </div>
                    {this.renderSummary()}
                </div>
            </div>
        );
    }
}

export default NotificationItem;