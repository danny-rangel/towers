import React, { Component } from 'react';
import FollowingListItem from './FollowingListItem';
import { fetchFollowing } from '../actions';
import { connect } from 'react-redux';
import './notifications/Notifications.css';

class FollowingList extends Component {

    componentDidMount() {
        this.props.fetchFollowing(this.props.match.params.id);
    }

    renderList() {
        const { users } = this.props;
        if (users) {
            return users.map(user => {
                return (
                    <FollowingListItem 
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

export default connect(mapStateToProps, { fetchFollowing })(FollowingList);