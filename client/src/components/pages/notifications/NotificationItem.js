import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './NotificationItem.css';

class NotificationItem extends Component {
    renderSummary() {
        const {
            notification: { action, fromUsername }
        } = this.props;

        if (action === 'Follow') {
            return (
                <div>
                    <Link to={`/${fromUsername}`}>{fromUsername}</Link>
                    {` started listening to you.`}
                </div>
            );
        } else if (action === 'Like') {
            return (
                <div>
                    <Link to={`/${fromUsername}`}>{fromUsername}</Link>
                    {` liked your post.`}
                </div>
            );
        }
    }

    render() {
        const {
            notification: { fromUsername, image, date }
        } = this.props;
        return (
            <div>
                <div>
                    <img alt={fromUsername} src={`${image}`}></img>
                </div>
                <div>
                    <div>{moment(date, moment.ISO_8601).fromNow()}</div>
                    {this.renderSummary()}
                </div>
            </div>
        );
    }
}

export default NotificationItem;
