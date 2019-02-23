import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './NotificationItem.css';

class NotificationItem extends Component {

    renderSummary() {
        if (this.props.notification.action === "Follow") {
            return (
                <div className="summary" id="summaryText">
                    {`${this.props.notification.fromUsername} started listening to you.`}
                </div>
            );
        } else if (this.props.notification.action === "Like") {
            return(
                <div className="summary" id="summaryText">
                    {`${this.props.notification.fromUsername} liked your post.`}
                </div>
            );
        }
    }


    render() {
        return (
            <div className="event">
                <div className="label">
                    <Link to={`/${this.props.notification.fromUsername}`} >
                        <img 
                            alt={this.props.notification.fromUsername} 
                            src={this.props.notification.image}>
                        </img>
                    </Link>
                </div>
                <div className="content">
                    <div className="date" id="dateText" >
                        {moment(this.props.notification.date, moment.ISO_8601).fromNow()}
                    </div>
                    {this.renderSummary()}
                </div>
            </div>
        );
    }
}

export default NotificationItem;