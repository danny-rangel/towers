import React, { Component } from 'react';
import FollowerListItem from './FollowerListItem';
import { fetchFollowers, isFetching } from '../../../actions';
import { connect } from 'react-redux';
import '../notifications/Notifications.css';

class FollowerList extends Component {
    async componentDidMount() {
        this.props.isFetching(true);
        await this.props.fetchFollowers(this.props.match.params.id);
        this.props.isFetching(false);
    }

    renderList() {
        const { users } = this.props;

        if (users) {
            return users.map(user => {
                return <FollowerListItem key={user._id} user={user} />;
            });
        } else {
            return <div></div>;
        }
    }

    render() {
        const { fetching } = this.props;
        return (
            <div className="ui container" id="notificationSection">
                <div
                    style={{
                        color: 'white',
                        textAlign: 'left',
                        margin: '20px 0 0 0'
                    }}
                >
                    <h1 style={{ fontSize: '4rem', fontWeight: '800' }}>
                        Listeners
                    </h1>
                </div>
                <div className="ui feed" id="notificationFeed">
                    {fetching ? (
                        <div
                            className="ui active inverted centered inline loader"
                            style={{ margin: '200px auto' }}
                        ></div>
                    ) : (
                        this.renderList()
                    )}
                </div>
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
    { fetchFollowers, isFetching }
)(FollowerList);
