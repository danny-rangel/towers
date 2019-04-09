import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isFetching, fetchNotifications, viewNotifications, haveNewNotifications } from '../../actions';
import './Notifications.css';
import NotificationList from './NotificationList';
import socket from '../../utils/socketClient';

class Notifications extends Component {

    async componentDidMount() {
        this.props.isFetching(true);

        await this.props.viewNotifications();
        this.props.fetchNotifications();
        this.props.haveNewNotifications();
        this.props.isFetching(false);

        socket.on('notification', (data) => {
            this.props.fetchNotifications();
        });
    }

    render() {
        const { notifications, fetching } = this.props;
        return (
            <div className="ui container" id="notificationSection">
                <div style={{color: 'white', textAlign: 'left', margin: '20px 0 0 0'}}>
                    <h1 style={{fontSize: '4rem', fontWeight: '800'}}>Notifications</h1>
                </div>
                {fetching ? 
                    (
                        <div className="ui active centered inline loader" style={{margin: '200px auto'}}></div>
                    ) : 
                    (
                        <NotificationList notifications={notifications}/>
                    )
                }
                
            </div>
        );
    }
}

const mapStateToProps = ({ notifications, fetching }) => {
    return { notifications, fetching };
}

export default connect(mapStateToProps, { isFetching, fetchNotifications, viewNotifications, haveNewNotifications } )(Notifications);