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
import Loader from '../../styled/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostList from '../../post/PostList';
import StyledButton from '../../styled/Button';
import Dialog from '@material-ui/core/Dialog';
import EditProfile from './EditProfile';
import EditAVI from './EditAVI';

const StyledHeader = styled.div`
    width: 100%;
    /* background-color: #00d9c5; */
    background: rgba(0, 217, 195, 1);
    background: -moz-linear-gradient(
        top,
        rgba(0, 217, 195, 1) 0%,
        rgba(0, 217, 195, 1) 1%,
        rgba(0, 217, 195, 1) 47%,
        rgba(0, 242, 255, 1) 100%
    );
    background: -webkit-gradient(
        left top,
        left bottom,
        color-stop(0%, rgba(0, 217, 195, 1)),
        color-stop(1%, rgba(0, 217, 195, 1)),
        color-stop(47%, rgba(0, 217, 195, 1)),
        color-stop(100%, rgba(0, 242, 255, 1))
    );
    background: -webkit-linear-gradient(
        top,
        rgba(0, 217, 195, 1) 0%,
        rgba(0, 217, 195, 1) 1%,
        rgba(0, 217, 195, 1) 47%,
        rgba(0, 242, 255, 1) 100%
    );
    background: -o-linear-gradient(
        top,
        rgba(0, 217, 195, 1) 0%,
        rgba(0, 217, 195, 1) 1%,
        rgba(0, 217, 195, 1) 47%,
        rgba(0, 242, 255, 1) 100%
    );
    background: -ms-linear-gradient(
        top,
        rgba(0, 217, 195, 1) 0%,
        rgba(0, 217, 195, 1) 1%,
        rgba(0, 217, 195, 1) 47%,
        rgba(0, 242, 255, 1) 100%
    );
    background: linear-gradient(
        to bottom,
        rgba(0, 217, 195, 1) 0%,
        rgba(0, 217, 195, 1) 1%,
        rgba(0, 217, 195, 1) 47%,
        rgba(0, 242, 255, 1) 100%
    );
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
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    bottom: -19%;
    cursor: ${props =>
        props.auth
            ? props.auth._id === props.user._id
                ? 'pointer'
                : null
            : null};
`;

const StyledDialog = styled(Dialog)`
    && {
        .MuiPaper-root.MuiPaper-elevation24.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-rounded {
            width: 100%;
            max-width: 400px;
        }
    }
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
    const [open, setOpen] = useState(false);
    const [aviOpen, setAviOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const username = match.params.username;

    const fetchProfileInformation = () => {
        setIsLoading(true);
        handleClose();
        clearUserState();
        clearPostsState();
        setPage(0);
        checkUser(username);
        fetchAllUserPostsCount(username);
        fetchUserPosts(username);
        setIsLoading(false);
    };

    const fetchFollowingInformation = () => {
        if (auth) {
            isFollowing(username);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAVIClickOpen = () => {
        setAviOpen(true);
    };

    const handleAVIClose = () => {
        setAviOpen(false);
    };

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
    };

    const renderProfile = () => {
        return (
            <>
                <StyledHeader>
                    {user && !isLoading ? (
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
                    ) : // <Loader height="40px" width="40px" newcolor="#ffffff" />
                    null}
                    {user && !isLoading ? (
                        auth ? (
                            user._id !== auth._id ? (
                                <StyledButton
                                    color="primary"
                                    background-color="white"
                                    margin="10px 0"
                                    hovercolor="#e7e5e5"
                                    onClick={() => follow(user, auth)}
                                >
                                    {following ? 'Listening' : 'Listen'}
                                </StyledButton>
                            ) : (
                                <>
                                    <StyledButton
                                        color="primary"
                                        background-color="white"
                                        margin="10px 0"
                                        hovercolor="#e7e5e5"
                                        onClick={handleClickOpen}
                                    >
                                        Edit Profile
                                    </StyledButton>
                                    <StyledDialog
                                        onClick={e => e.stopPropagation()}
                                        onClose={handleClose}
                                        aria-labelledby="new-post-dialog"
                                        open={open}
                                    >
                                        <EditProfile
                                            handleClose={handleClose}
                                            refetch={fetchProfileInformation}
                                        />
                                    </StyledDialog>
                                </>
                            )
                        ) : (
                            <StyledButton
                                color="primary"
                                background-color="white"
                                margin="10px 0"
                                hovercolor="#e7e5e5"
                            >
                                Listen
                            </StyledButton>
                        )
                    ) : // <Loader height="40px" width="40px" newcolor="#ffffff" />
                    null}
                    {user && !isLoading ? (
                        <>
                            <StyledAvatar
                                alt={user.username}
                                src={user.profileImage}
                                auth={auth}
                                user={user}
                                onClick={
                                    auth
                                        ? auth._id === user._id
                                            ? () => handleAVIClickOpen()
                                            : null
                                        : null
                                }
                            />
                            <StyledDialog
                                onClick={e => e.stopPropagation()}
                                onClose={handleAVIClose}
                                aria-labelledby="new-post-dialog"
                                open={aviOpen}
                            >
                                <EditAVI
                                    handleClose={handleAVIClose}
                                    refetch={fetchProfileInformation}
                                />
                            </StyledDialog>
                        </>
                    ) : (
                        <Loader height="40px" width="40px" newcolor="#ffffff" />
                    )}
                </StyledHeader>
                {posts && !isLoading ? (
                    <InfiniteScroll
                        style={{
                            width: '95%',
                            maxWidth: '325px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '130px auto 100px',
                            overflow: 'visible'
                        }}
                        dataLength={posts.length}
                        next={() => {
                            continuefetchUserPosts(user.username, page + 1, 20);
                            setPage(page + 1);
                        }}
                        hasMore={posts.length !== postCount}
                        loader={<Loader width="40px" height="40px" />}
                        endMessage={
                            <h4 style={{ textAlign: 'center', color: 'black' }}>
                                <b>You're all caught up!</b>
                            </h4>
                        }
                    >
                        <PostList
                            posts={posts}
                            refetchPosts={fetchProfileInformation}
                        />
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
