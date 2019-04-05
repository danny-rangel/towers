import React, { Component } from 'react';
import FollowerListItem from './FollowerListItem';
import { fetchFollowers } from '../actions';
import { connect } from 'react-redux';
import './notifications/Notifications.css';

class FollowerList extends Component {

    componentDidMount() {
        this.props.fetchFollowers(this.props.match.params.id);
    }

    renderList() {
        const { users } = this.props;

        if (users) {
            return users.map(user => {
                return (
                    <FollowerListItem 
                        key={user._id} 
                        user={user}
                    />
                );
            });
        } else {
            return <div></div>
        }
    }



    render() {
        return (
            <div className="ui container" id="notificationSection">
                <div style={{color: 'white', textAlign: 'left', margin: '20px 0 0 0'}}>
                    <h1 style={{fontSize: '4rem', fontWeight: '800'}}>Listeners</h1>
                </div>
                <div className="ui feed" id="notificationFeed">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users
    };
}

export default connect(mapStateToProps, { fetchFollowers })(FollowerList);