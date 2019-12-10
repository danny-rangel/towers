import React, { useEffect, useState } from 'react';
import './Home.css';
import history from '../../../history';
import PostList from '../../post/PostList';
import { connect } from 'react-redux';
import {
    fetchFollowerPosts,
    isFetching,
    continuefetchFollowerPosts,
    fetchAllFollowerPostsCount,
    clearPostsState
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
    fetchAllFollowerPostsCount,
    clearPostsState
}) => {
    const [page, setPage] = useState(0);

    const fetchHomePosts = () => {
        // history.push('/home');
        isFetching(true);
        setPage(0);
        clearPostsState();
        fetchAllFollowerPostsCount();
        fetchFollowerPosts();
        isFetching(false);
    };

    useEffect(() => {
        if (!auth) {
            history.push('/');
        } else {
            if (auth) {
                if (auth.username === '') {
                    history.push(`/edit/${auth._id}`);
                }
            }
            fetchHomePosts();
        }
    }, [auth]);

    return (
        <Wrapper>
            {posts ? (
                <InfiniteScroll
                    style={{
                        width: '100%',
                        maxWidth: '325px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'visible'
                    }}
                    dataLength={posts.length}
                    next={() => {
                        continuefetchFollowerPosts(page + 1, 20);
                        setPage(page + 1);
                    }}
                    hasMore={posts.length !== postCount}
                    loader={<Loader height="40px" width="40px" />}
                    endMessage={
                        <h4 style={{ textAlign: 'center' }}>
                            You're all caught up!
                        </h4>
                    }
                >
                    <PostList posts={posts} refetchPosts={fetchHomePosts} />
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

export default connect(mapStateToProps, {
    fetchFollowerPosts,
    continuefetchFollowerPosts,
    isFetching,
    fetchAllFollowerPostsCount,
    clearPostsState
})(Home);
