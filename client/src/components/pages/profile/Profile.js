import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
import Loader from '../../styled/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostList from '../../post/PostList';
import StyledButton from '../../styled/Button';

const StyledHeader = styled.div`
    width: 100%;
    background-color: #00d9c5;
    height: 420px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const StyledInnerHeader = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-around;
    margin: 0 0 40px;
`;

const StyledCountTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledAvatar = styled.img`
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    bottom: -25%;
    cursor: ${props => (props.auth ? 'pointer' : null)};
`;

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
                <StyledHeader>
                    {user ? (
                        <>
                            <h1
                                style={{
                                    margin: '40px 0 10px',
                                    fontWeight: '500',
                                    fontSize: '2.5rem'
                                }}
                            >
                                {user.username}
                            </h1>
                            <h4
                                style={{
                                    fontWeight: '100',
                                    margin: '10px 0 20px',
                                    wordWrap: 'break-word'
                                }}
                            >
                                {user.aboutme}
                            </h4>
                            <StyledInnerHeader>
                                <StyledCountTextDiv>
                                    <Link to={`/followers/${user._id}`}>
                                        <h2>{user.followersCount}</h2>
                                    </Link>
                                    <Link to={`/followers/${user._id}`}>
                                        <h3 style={{ fontWeight: '100' }}>
                                            listeners
                                        </h3>
                                    </Link>
                                </StyledCountTextDiv>
                                <StyledCountTextDiv>
                                    <h2>{user.postsNumber}</h2>
                                    <h3 style={{ fontWeight: '100' }}>songs</h3>
                                </StyledCountTextDiv>
                                <StyledCountTextDiv>
                                    <Link to={`/following/${user._id}`}>
                                        <h2>{user.followingCount}</h2>
                                    </Link>
                                    <Link to={`/following/${user._id}`}>
                                        <h3 style={{ fontWeight: '100' }}>
                                            listening
                                        </h3>
                                    </Link>
                                </StyledCountTextDiv>
                            </StyledInnerHeader>
                        </>
                    ) : (
                        <Loader height="40px" width="40px" color="#ffffff" />
                    )}
                    {user ? (
                        auth ? (
                            user._id !== auth._id ? (
                                <StyledButton
                                    color="primary"
                                    background-color="white"
                                    margin="10px 0"
                                    onClick={() => follow(user, auth)}
                                >
                                    {following ? 'Listening' : 'Listen'}
                                </StyledButton>
                            ) : (
                                <Link to={`/edit/${auth._id}`}>
                                    <StyledButton
                                        color="primary"
                                        background-color="white"
                                        margin="10px 0"
                                    >
                                        Edit Profile
                                    </StyledButton>
                                </Link>
                            )
                        ) : (
                            <StyledButton
                                color="primary"
                                background-color="white"
                                margin="10px 0"
                            >
                                Listen
                            </StyledButton>
                        )
                    ) : (
                        <Loader height="40px" width="40px" color="#ffffff" />
                    )}
                    {user ? (
                        <StyledAvatar
                            alt={user.username}
                            src={user.profileImage}
                            auth={auth}
                            onClick={
                                auth
                                    ? auth._id === user._id
                                        ? () =>
                                              history.push(
                                                  `/edit/avi/${auth._id}`
                                              )
                                        : null
                                    : null
                            }
                        />
                    ) : (
                        <Loader height="40px" width="40px" color="#ffffff" />
                    )}
                </StyledHeader>
                {posts ? (
                    <InfiniteScroll
                        style={{
                            width: '95%',
                            maxWidth: '370px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '130px auto 100px'
                        }}
                        dataLength={posts.length}
                        next={() => {
                            continuefetchUserPosts(user.username, page + 1, 20);
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
            </>
        );
    };

    return <>{renderProfile()}</>;
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
