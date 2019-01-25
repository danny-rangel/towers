import React, { Component } from 'react';
import PostItem from './PostItem';
import './PostList.css';

class PostList extends Component {

    renderPosts() {
        return this.props.posts.map(post => {
            return (
                <PostItem key={post._id} post={post}/>
            );
        })
    }

    render() {
        return (
            <div  className="ui container">
                <div id="postListContainer" className="ui relaxed list" >
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}


export default PostList;