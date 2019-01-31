import React, { Component } from 'react';
import './Home.css';
import PostList from './post/PostList';
import history from '../history';
import { connect } from 'react-redux';
import { fetchFollowerPosts, isFetching } from '../actions';
import Spinner from './Spinner';

class Home extends Component {

    async componentDidMount() {
        this.props.isFetching(true);
        if (!this.props.auth) {
            history.push('/');
        } else if (this.props.auth.username === "" || this.props.auth.username === null) {
            history.push(`/edit/${this.props.auth._id}`);
        }

        await this.props.fetchFollowerPosts();
        this.props.isFetching(false);
    }


    render() {
        if (this.props.fetching) {
            return <Spinner />
        }
        return (
            <div id="mainMiddleDiv">
                <PostList posts={this.props.posts} />
            </div>
        );
    }
}

const mapStateToProps = ({ posts, auth, fetching }) => {
    return { posts, auth, fetching }
}


export default connect(mapStateToProps, { fetchFollowerPosts, isFetching })(Home);