import React, { useEffect, useState } from 'react';
import './Home.css';
import history from '../../../history';
import PostList from '../../post/PostList';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
    fetchFollowerPosts,
    isFetching,
    continuefetchFollowerPosts,
    fetchAllFollowerPostsCount
} from '../../../actions';
import InfiniteScroll from 'react-infinite-scroll-component';
import Wrapper from '../../styled/Wrapper';
import Loader from '../../styled/Loader';

const Home = ({
    posts,
    auth,
    fetching,
    fetchFollowerPosts,
    continuefetchFollowerPosts,
    isFetching,
    postCount,
    fetchAllFollowerPostsCount
}) => {
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!auth) {
            history.push('/');
        } else {
            isFetching(true);
            fetchAllFollowerPostsCount();
            fetchFollowerPosts();
            isFetching(false);
        }
    }, [auth]);

    return (
        <Wrapper>
            {posts ? (
                <InfiniteScroll
                    style={{
                        width: '100%',
                        maxWidth: '525px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    dataLength={posts.length}
                    next={() => {
                        continuefetchFollowerPosts(page + 1, 20);
                        setPage(page + 1);
                    }}
                    hasMore={posts.length !== postCount}
                    loader={<div>Loading...</div>}
                    endMessage={
                        <h4 style={{ textAlign: 'center', color: 'black' }}>
                            <b>You're all caught up!</b>
                        </h4>
                    }
                >
                    <PostList posts={posts} />
                </InfiniteScroll>
            ) : (
                <Loader height="40px" width="40px" />
            )}
        </Wrapper>
    );
};

const mapStateToProps = ({ posts, auth, fetching, postCount }) => {
    return { posts, auth, fetching, postCount };
};

export default connect(
    mapStateToProps,
    {
        fetchFollowerPosts,
        continuefetchFollowerPosts,
        isFetching,
        fetchAllFollowerPostsCount
    }
)(Home);
