import React, { Component } from 'react';
import './Home.css';
import PostList from './post/PostList';
import history from '../history';
import { connect } from 'react-redux';
import { fetchFollowerPosts } from '../actions';
import Spinner from './Spinner';

class Home extends Component {

    componentDidMount() {

        if (!this.props.auth) {
            history.push('/');
        } else if (this.props.auth.username === "") {
            history.push('/signup');
        }

        this.props.fetchFollowerPosts();
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


export default connect(mapStateToProps, { fetchFollowerPosts })(Home);