import React, { Component } from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { isFetching, fetchNotifications } from '../../actions';
import './Notifications.css';
import NotificationList from './NotificationList';

class Notifications extends Component {

    async componentDidMount() {
        this.props.isFetching(true);
        // if (!this.props.auth) {
        //     history.push('/');
        // } else if (this.props.auth.username === "" || this.props.auth.username === null) {
        //     history.push(`/edit/${this.props.auth._id}`);
        // }

        await this.props.fetchNotifications();
        this.props.isFetching(false);
    }

    render() {
        const { notifications } = this.props;
        return (
            <div className="ui container" id="notificationSection">
                <NotificationList notifications={notifications}/>
            </div>
            
        );
    }
}

const mapStateToProps = ({ notifications }) => {
    return { notifications };
}

export default connect(mapStateToProps, { isFetching, fetchNotifications } )(Notifications);