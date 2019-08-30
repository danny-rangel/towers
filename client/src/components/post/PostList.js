import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, refetchPosts }) => {
    const renderPosts = () => {
        return posts.map(post => {
            return (
                <PostItem
                    key={post._id}
                    post={post}
                    refetchPosts={refetchPosts}
                />
            );
        });
    };

    return <>{posts ? <>{renderPosts()}</> : null}</>;
};

export default PostList;
