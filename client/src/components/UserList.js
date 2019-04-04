import React, { Component } from 'react';
import UserListItem from './UserListItem';
import { fetchPostLikes } from '../actions';
import { connect } from 'react-redux';
import './notifications/Notifications.css';

class UserList extends Component {

    componentDidMount() {
        this.props.fetchPostLikes(this.props.match.params.id);
    }

    renderList() {
        const { users } = this.props;

        if (users) 
        {
            return users.map(user => {
                return (
                    <UserListItem 
                        key={user._id} 
                        user={user}
                    />
                );
            });
        } else {
            return <div id="searchError" >No results found</div>
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

export default connect(mapStateToProps, { fetchPostLikes })(UserList);