import React, { Component } from 'react';
import PostForm from './PostForm';

class PostNew extends Component {
    render() {
        return (
            <div className="ui container">
                <PostForm />
            </div>
        );
    }
}

export default PostNew;