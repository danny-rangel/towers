import React, { Component } from 'react';
import UserListItem from './UserListItem';
import { fetchPostLikes, isFetching } from '../../../actions';
import { connect } from 'react-redux';
import '../notifications/Notifications.css';

class UserList extends Component {
    async componentDidMount() {
        this.props.isFetching(true);
        await this.props.fetchPostLikes(this.props.match.params.id);
        this.props.isFetching(false);
    }

    renderList() {
        const { users } = this.props;

        if (users) {
            return users.map(user => {
                return <UserListItem key={user._id} user={user} />;
            });
        } else {
            return <div>No results found</div>;
        }
    }

    render() {
        const { fetching } = this.props;
        return (
            <div>
                <div>
                    <h1>Likes</h1>
                </div>
                <div>{fetching ? <div></div> : this.renderList()}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ users, fetching }) => {
    return {
        users,
        fetching
    };
};

export default connect(
    mapStateToProps,
    { fetchPostLikes, isFetching }
)(UserList);
