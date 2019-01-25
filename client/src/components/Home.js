import React, { Component } from 'react';
import './Home.css';
import PostList from './post/PostList';
import history from '../history';
import { connect } from 'react-redux';
import { fetchFollowerPosts } from '../actions';

class Home extends Component {

    async componentDidMount() {

        if (this.props.auth === false) {
            history.push('/');
        }

        await this.props.fetchFollowerPosts();
    }


    render() {
        return (
            <div id="mainMiddleDiv">
                <PostList posts={this.props.followerPosts} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { followerPosts: state.followerPosts, auth: state.auth }
}


export default connect(mapStateToProps, { fetchFollowerPosts })(Home);