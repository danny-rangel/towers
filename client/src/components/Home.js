import React, { Component } from 'react';
import './Home.css';
import PostList from './post/PostList';
import history from '../history';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions';

class Home extends Component {

    async componentDidMount() {

        if (this.props.auth === false) {
            history.push('/');
        }

        await this.props.fetchAllPosts();
    }

    render() {
        return (
            <div id="mainMiddleDiv">
                <PostList posts={this.props.allPosts} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { allPosts: state.allPosts, auth: state.auth }
}


export default connect(mapStateToProps, { fetchAllPosts })(Home);