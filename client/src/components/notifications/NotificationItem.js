import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './NotificationItem.css';

class NotificationItem extends Component {

    renderSummary() {
        const { notification } = this.props;

        if (notification.action === "Follow") {
            return (
                <div className="summary" id="summaryText" style={{color: 'white', fontSize: '1.2rem',fontWeight: '800'}}>
                    <Link to={`/${notification.fromUsername}`} style={{color: 'white', fontSize: '1.5rem'}} >
                        {notification.fromUsername}
                    </Link>
                    {` started listening to you.`}
                </div>
            );
        } else if (notification.action === "Like") {
            return(
                <div className="summary" id="summaryText" style={{color: 'white', fontSize: '1.2rem', fontWeight: '800'}}>
                    <Link to={`/${notification.fromUsername}`} style={{color: 'white', fontSize: '1.5rem'}}>
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
                        src={`${notification.image}`}
                        style={{width: '40px'}}    
                    >
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