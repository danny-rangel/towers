import React, { Component } from 'react';
import FollowingListItem from './FollowingListItem';
import { fetchFollowing, isFetching } from '../actions';
import { connect } from 'react-redux';
import './notifications/Notifications.css';

class FollowingList extends Component {

    async componentDidMount() {
        this.props.isFetching(true);
        await this.props.fetchFollowing(this.props.match.params.id);
        this.props.isFetching(false);
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
        const { fetching } = this.props;
        return (
            <div className="ui container" id="notificationSection">
                <div style={{color: 'white', textAlign: 'left', margin: '20px 0 0 0'}}>
                    <h1 style={{fontSize: '4rem', fontWeight: '800'}}>Listening</h1>
                </div>
                <div className="ui feed" id="notificationFeed">
                    {fetching ? 
                        (
                            <div className="ui active centered inline loader" style={{margin: '200px auto'}}></div>
                        ):
                        (
                            this.renderList()
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ users, fetching }) => {
    return {
        users, fetching
    };
}

export default connect(mapStateToProps, { isFetching, fetchFollowing })(FollowingList);