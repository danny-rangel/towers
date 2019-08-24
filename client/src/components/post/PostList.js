import React, { Component } from 'react';
import PostItem from './PostItem';
import './PostList.css';

class PostList extends Component {
    renderPosts() {
        return this.props.posts.map(post => {
            return <PostItem key={post._id} post={post} />;
        });
    }

    render() {
        const { posts } = this.props;
        if (!posts) {
            return null;
        } else {
            return (
                <div>
                    <div>{this.renderPosts()}</div>
                </div>
            );
        }
    }
}

export default PostList;
