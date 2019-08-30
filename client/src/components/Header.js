import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import media from './styled/media';
import './Header.css';
import {
    isMusicKitAuthorized,
    haveNewNotifications,
    fetchAllFollowerPostsCount,
    fetchFollowerPosts,
    viewNotifications
} from '../actions';
import socket from '../utils/socketClient';
import history from '../history';

import StyledDrawer from './styled/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import NotiIcon from '@material-ui/icons/Notifications';
import NotiActiveIcon from '@material-ui/icons/NotificationsActive';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StyledButton from './styled/Button';

const StyledHeader = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0px 1px 0px rgba(165, 164, 164, 0.24);
`;

const StyledSpan = styled.span`
    flex: 1 0 100px;
    display: flex;
    justify-content: center;

    ${media.medium`
        flex: 1;
    `}
`;

const StyledAVISpan = styled.span`
    flex: 0 1 800px;
    display: flex;
    justify-content: flex-end;
    margin-right: 100px;

    ${media.medium`
        margin-right: 0px;
        justify-content: center;
        flex: 1;
    `}
`;

const StyledAvatar = styled.img`
    width: 40px;
    height: 40px;
    background-color: gray;
    border-radius: 50%;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;
    color: #000000;
    display: flex;
    justify-content: center;
`;

const StyledIcon = styled(SearchIcon)`
    && {
        font-size: 2rem;
        color: #00d9c5;
    }
`;

const StyledNotiIcon = styled(NotiIcon)`
    && {
        font-size: 2rem;
        color: #00d9c5;
    }
`;

const StyledNotiActiveIcon = styled(NotiActiveIcon)`
    && {
        font-size: 2rem;
        color: #00d9c5;
    }
`;

const StyledAvatarButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    justify-content: flex-end;
`;

const Header = ({
    auth,
    authorized,
    musicKit,
    newNotifications,
    isMusicKitAuthorized,
    haveNewNotifications,
    fetchAllFollowerPostsCount,
    fetchFollowerPosts,
    viewNotifications
}) => {
    const [newPost, setNewPost] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const authorizeUser = async () => {
        const res = await musicKit.authorize();
        isMusicKitAuthorized(res);
    };

    const unauthorizeUser = async () => {
        const res = await musicKit.unauthorize();
        isMusicKitAuthorized(res);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        if (auth) {
            haveNewNotifications();
            socket.on('notification', () => {
                haveNewNotifications();
            });

            socket.on('post', () => {
                setNewPost(true);
            });
        }
    }, [auth]);

    const fetchNewStuff = () => {
        fetchAllFollowerPostsCount();
        fetchFollowerPosts();
        setNewPost(false);
    };

    const clearNewNotifications = async () => {
        await viewNotifications();
        haveNewNotifications();
    };

    return (
        <>
            {history.location.pathname !== '/' ? (
                <StyledHeader>
                    {auth ? (
                        <>
                            <StyledSpan className="tower">
                                <StyledLink
                                    onClick={newPost ? fetchNewStuff : null}
                                    to={'/home'}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <svg className="icon"></svg>
                                </StyledLink>
                            </StyledSpan>
                            <StyledSpan>
                                <StyledLink to="/search/songs">
                                    <StyledIcon />
                                </StyledLink>
                            </StyledSpan>
                            <StyledSpan>
                                <StyledLink
                                    onClick={
                                        newNotifications
                                            ? clearNewNotifications
                                            : null
                                    }
                                    to="/notifications"
                                >
                                    {newNotifications ? (
                                        <StyledNotiActiveIcon />
                                    ) : (
                                        <StyledNotiIcon />
                                    )}
                                </StyledLink>
                            </StyledSpan>
                            <StyledAVISpan>
                                <StyledAvatarButton
                                    onClick={() => setDrawerOpen(true)}
                                >
                                    <StyledAvatar
                                        alt={auth.username}
                                        src={auth.profileImage}
                                    ></StyledAvatar>
                                </StyledAvatarButton>
                            </StyledAVISpan>

                            <StyledDrawer
                                drawerOpen={drawerOpen}
                                closeDrawer={closeDrawer}
                            >
                                <List>
                                    <Link
                                        to={`/${auth.username}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#000000'
                                        }}
                                    >
                                        <ListItem button key={auth.username}>
                                            <img
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: 'gray',
                                                    borderRadius: '50%',
                                                    margin: '0 16px'
                                                }}
                                                alt={auth.username}
                                                src={auth.profileImage}
                                            ></img>
                                            <ListItemText
                                                primary={auth.username}
                                            />
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                    <ListItem
                                        button
                                        key={'applemusic'}
                                        onClick={() => {
                                            if (authorized) {
                                                unauthorizeUser();
                                            } else {
                                                authorizeUser();
                                            }
                                        }}
                                    >
                                        <svg className="apple"></svg>
                                        <ListItemText
                                            primary={
                                                authorized
                                                    ? 'Sign out of Apple Music'
                                                    : 'Listen with Apple Music'
                                            }
                                        />
                                    </ListItem>
                                    {/* <Link
                                to={`/about`}
                                style={{
                                    textDecoration: 'none',
                                    color: '#000000'
                                }}
                            >
                                <ListItem button key={'about'}>
                                    <ListItemText
                                        style={{ padding: '0 20px' }}
                                        primary={'About'}
                                    />
                                </ListItem>
                            </Link> */}
                                    <a
                                        href="/api/logout"
                                        style={{
                                            textDecoration: 'none',
                                            color: '#000000'
                                        }}
                                    >
                                        <ListItem button key={'logout'}>
                                            <ListItemText
                                                style={{ padding: '0 20px' }}
                                                primary={'Sign out'}
                                            />
                                        </ListItem>
                                    </a>
                                </List>
                            </StyledDrawer>
                        </>
                    ) : (
                        <>
                            <StyledSpan
                                className="tower"
                                style={{
                                    justifyContent: 'flex-start',
                                    marginLeft: '40px'
                                }}
                            >
                                <StyledLink
                                    to={'/'}
                                    style={{
                                        width: '105px',
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <svg className="logo-text"></svg>
                                </StyledLink>
                            </StyledSpan>
                            <StyledButton
                                width="120px"
                                margin="0 20px"
                                backgroundcolor="primary"
                                href="/auth/google"
                            >
                                Log In
                            </StyledButton>
                            <StyledButton
                                width="120px"
                                margin="0 20px"
                                backgroundcolor="primary"
                                href="/auth/google"
                            >
                                Sign Up
                            </StyledButton>
                        </>
                    )}
                </StyledHeader>
            ) : null}
        </>
    );
};

const mapStateToProps = ({ auth, authorized, musicKit, newNotifications }) => {
    return { auth, authorized, musicKit, newNotifications };
};

export default connect(
    mapStateToProps,
    {
        isMusicKitAuthorized,
        haveNewNotifications,
        fetchAllFollowerPostsCount,
        fetchFollowerPosts,
        viewNotifications
    }
)(Header);
