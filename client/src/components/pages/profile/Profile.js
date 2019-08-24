import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    checkUser,
    fetchUserPosts,
    followUser,
    isFollowing,
    continuefetchUserPosts,
    fetchAllUserPostsCount,
    clearUserState,
    clearPostsState
} from '../../../actions';
import history from '../../../history';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostList from '../../post/PostList';
import './Profile.css';

const Profile = ({
    user,
    auth,
    match,
    posts,
    following,
    followUser,
    isFollowing,
    checkUser,
    fetchUserPosts,
    continuefetchUserPosts,
    fetchAllUserPostsCount,
    postCount,
    clearUserState,
    clearPostsState
}) => {
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [followPressed, setFollowPressed] = useState(false);
    const username = match.params.username;

    const fetchProfileInformation = () => {
        checkUser(username);
        fetchAllUserPostsCount(username);
        fetchUserPosts(username);
    };

    const fetchFollowingInformation = () => {
        if (auth) {
            isFollowing(username);
        }
    };

    useEffect(() => {
        return () => {
            clearUserState();
            clearPostsState();
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchProfileInformation();
        setIsLoading(false);
    }, [match.params.username]);

    useEffect(() => {
        setIsLoading(true);
        fetchFollowingInformation();
        setIsLoading(false);
    }, [auth]);

    const follow = async (user, auth) => {
        setFollowPressed(true);
        let body = {
            personFollowingId: auth._id,
            personFollowedId: user._id,
            personFollowingUsername: auth.username,
            personFollowedUsername: user.username,
            personFollowingImage: auth.profileImage,
            personFollowedImage: user.profileImage
        };

        await followUser(body);
        await isFollowing(username);
        setFollowPressed(false);
    };

    const renderProfile = () => {
        return (
            <>
                <div>
                    {auth ? (
                        <img
                            alt={user.username}
                            style={{
                                cursor:
                                    auth._id === user._id
                                        ? 'pointer'
                                        : 'default'
                            }}
                            onClick={
                                auth._id === user._id
                                    ? () =>
                                          history.push(`/edit/avi/${auth._id}`)
                                    : null
                            }
                            src={user.profileImage}
                        ></img>
                    ) : (
                        <img alt={user.username} src={user.profileImage}></img>
                    )}
                    <h2>{user.username}</h2>
                    <h5 style={{ margin: '0 5px', wordWrap: 'break-word' }}>
                        {user.aboutme}
                    </h5>
                    <div>
                        <div>
                            <h2>{user.postsNumber}</h2>
                        </div>
                        <div>
                            <h2>
                                <Link to={`/followers/${user._id}`}>
                                    {user.followersCount}
                                </Link>
                            </h2>
                        </div>
                        <div>
                            <h2>
                                <Link to={`/following/${user._id}`}>
                                    {user.followingCount}
                                </Link>
                            </h2>
                        </div>
                        <div>{user.postsNumber === 1 ? 'song' : 'songs'}</div>
                        <div>
                            <Link to={`/followers/${user._id}`}>listeners</Link>
                        </div>
                        <div>
                            <Link to={`/following/${user._id}`}>listening</Link>
                        </div>
                    </div>

                    {auth ? (
                        user._id !== auth._id ? (
                            <button
                                onClick={() => follow(user, auth)}
                                style={{
                                    backgroundColor: following
                                        ? 'white'
                                        : '#357cb9',
                                    color: following ? 'black' : 'white'
                                }}
                            >
                                {following ? 'Listening' : 'Listen'}
                            </button>
                        ) : (
                            <Link to={`/edit/${auth._id}`}>Edit Profile</Link>
                        )
                    ) : (
                        <div></div>
                    )}
                </div>
                <div>
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={() => {
                            continuefetchUserPosts(user.username, page + 1, 20);
                            setPage(page + 1);
                        }}
                        hasMore={posts.length !== postCount}
                        loader={<div>Loading...</div>}
                        endMessage={
                            <h3>
                                <b>That's everything!</b>
                            </h3>
                        }
                    >
                        <PostList posts={posts} />
                    </InfiniteScroll>
                </div>
            </>
        );
    };

    if (isLoading || !posts || !user) {
        return <div>Loading...</div>;
    } else if (user) {
        return <div>{renderProfile()}</div>;
    } else {
        return (
            <div>
                <h3>This is not the user you're looking for...</h3>
            </div>
        );
    }
};

const mapStateToProps = ({ user, posts, auth, following, postCount }) => {
    return { user, posts, auth, following, postCount };
};

export default connect(
    mapStateToProps,
    {
        checkUser,
        fetchUserPosts,
        followUser,
        isFollowing,
        continuefetchUserPosts,
        fetchAllUserPostsCount,
        clearUserState,
        clearPostsState
    }
)(Profile);
