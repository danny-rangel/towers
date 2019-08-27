import React from 'react';
import PostItem from './PostItem';
import './PostList.css';

const PostList = ({ posts }) => {
    const renderPosts = () => {
        return posts.map(post => {
            return <PostItem key={post._id} post={post} />;
        });
    };

    return <>{posts ? <>{renderPosts()}</> : null}</>;
};

export default PostList;
