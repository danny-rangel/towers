import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import {
    isMusicKitAuthorized,
    showSidebar,
    haveNewNotifications,
    fetchAllFollowerPostsCount,
    fetchFollowerPosts,
    viewNotifications
} from '../actions';
import socket from '../utils/socketClient';

class Header extends Component {
    state = { newPost: false };

    async authorizeUser() {
        const res = await this.props.musicKit.authorize();
        this.props.isMusicKitAuthorized(res);
    }

    async unauthorizeUser() {
        const res = await this.props.musicKit.unauthorize();
        this.props.isMusicKitAuthorized(res);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.auth !== this.props.auth) {
            if (this.props.auth) {
                this.props.haveNewNotifications();
                socket.on('notification', () => {
                    this.props.haveNewNotifications();
                });

                socket.on('post', () => {
                    this.setState({ newPost: true });
                });
            }
        }
    }

    fetchNewStuff = () => {
        this.props.fetchAllFollowerPostsCount();
        this.props.fetchFollowerPosts();
        this.setState({ newPost: false });
    };

    clearNewNotifications = async () => {
        await this.props.viewNotifications();
        this.props.haveNewNotifications();
    };

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <>
                        <div>
                            <a href="/auth/google">
                                <h3>Log in With Google</h3>
                            </a>
                        </div>
                        <div>
                            <Link to="/about">
                                <h3>About</h3>
                            </Link>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div>
                            <a href="/api/logout">
                                <h3>Sign Out of Towers</h3>
                            </a>
                        </div>
                        <div>
                            <Link to="/about">
                                <h3>About</h3>
                            </Link>
                        </div>
                    </>
                );
        }
    }

    renderAvatar() {
        if (!this.props.auth) {
            return;
        } else if (this.props.auth && this.props.sidebar === false) {
            return (
                <div
                    onClick={() => this.props.showSidebar(true)}
                    className="ui item"
                >
                    <div>
                        <img
                            alt={this.props.auth.username}
                            src={this.props.auth.profileImage}
                        ></img>
                        <h4>{this.props.auth.username}</h4>
                    </div>
                </div>
            );
        } else if (this.props.auth && this.props.sidebar === true) {
            return (
                <div>
                    <div>
                        <Link
                            onClick={() => this.props.showSidebar(false)}
                            to={`/${this.props.auth.username}`}
                        >
                            <img
                                alt={this.props.auth.username}
                                src={this.props.auth.profileImage}
                            ></img>
                        </Link>
                        <Link
                            onClick={() => this.props.showSidebar(false)}
                            to={`/${this.props.auth.username}`}
                        >
                            <h4>{this.props.auth.username}</h4>
                        </Link>
                    </div>
                </div>
            );
        }
    }

    renderMobileAvatar() {
        if (!this.props.auth) {
            return;
        } else if (this.props.auth && this.props.sidebar === false) {
            return (
                <div onClick={() => this.props.showSidebar(true)}>
                    <div>
                        <img
                            alt={this.props.auth.username}
                            src={this.props.auth.profileImage}
                        ></img>
                        {/* <h4 id="headerUsername" className="header">{this.props.auth.username}</h4> */}
                    </div>
                </div>
            );
        } else if (this.props.auth && this.props.sidebar === true) {
            return (
                <div>
                    <div>
                        <Link
                            onClick={() => this.props.showSidebar(false)}
                            to={`/${this.props.auth.username}`}
                        >
                            <img
                                alt={this.props.auth.username}
                                src={this.props.auth.profileImage}
                            ></img>
                        </Link>
                        {/* <Link onClick={() => this.props.showSidebar(false)} to={`/${this.props.auth.username}`}><h4 id="headerUsername" className="header">{this.props.auth.username}</h4></Link> */}
                    </div>
                </div>
            );
        }
    }

    renderAppleAuth() {
        switch (this.props.authorized) {
            case false:
                return (
                    <div>
                        <div onClick={() => this.authorizeUser()}>
                            <h3>
                                Listen with Apple Music
                                {/* <img alt="applemusicicon" id="appleMusicIcon" src="Apple_Music_Icon.png"></img> */}
                            </h3>
                        </div>
                    </div>
                );
            default:
            case true:
                return (
                    <div>
                        <div onClick={() => this.unauthorizeUser()}>
                            <h3>
                                Sign Out of Apple Music
                                {/* <img alt="applemusicicon" id="appleMusicIcon" src="Apple_Music_Icon.png"></img> */}
                            </h3>
                        </div>
                    </div>
                );
            case null:
                return;
        }
    }

    renderSidebar() {
        switch (this.props.sidebar) {
            case true:
                return (
                    <div>
                        <button>
                            <i
                                onClick={() => this.props.showSidebar(false)}
                            ></i>
                        </button>
                        {this.renderAvatar()}
                        {this.renderAppleAuth()}
                        {this.renderContent()}
                    </div>
                );
            default:
                return;
        }
    }

    renderMobileSidebar() {
        switch (this.props.sidebar) {
            case true:
                return (
                    <div>
                        <button>
                            <i
                                onClick={() => this.props.showSidebar(false)}
                            ></i>
                        </button>
                        {this.renderMobileAvatar()}
                        {this.renderAppleAuth()}
                        {this.renderContent()}
                    </div>
                );
            default:
                return;
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <Link
                            onClick={
                                this.state.newPost ? this.fetchNewStuff : null
                            }
                            to={this.props.auth ? '/home' : '/'}
                        >
                            Home
                        </Link>
                        <Link to="/search/songs">Search</Link>
                        <Link
                            onClick={
                                this.props.newNotifications
                                    ? this.clearNewNotifications
                                    : null
                            }
                            style={{
                                display: this.props.auth ? '' : 'none'
                            }}
                            to="/notifications"
                        >
                            Notifications
                        </Link>
                        <div>
                            <div
                                style={{
                                    display: this.props.auth ? 'none' : ''
                                }}
                            >
                                <a href="/auth/google">
                                    <div>LOG IN</div>
                                </a>
                            </div>
                            {this.renderAvatar()}
                            {this.renderSidebar()}
                        </div>
                    </div>
                </div>

                <div>
                    <Link
                        onClick={this.state.newPost ? this.fetchNewStuff : null}
                        style={{ display: this.props.auth ? '' : 'none' }}
                        to={this.props.auth ? '/home' : '/'}
                    >
                        Home
                    </Link>
                    <Link
                        style={{ display: this.props.auth ? '' : 'none' }}
                        to="/search/songs"
                    >
                        Search
                    </Link>
                    <Link
                        onClick={
                            this.props.newNotifications
                                ? this.clearNewNotifications
                                : null
                        }
                        style={{ display: this.props.auth ? '' : 'none' }}
                        to="/notifications"
                    >
                        Notifications
                    </Link>
                    <div>
                        <div
                            style={{
                                display: this.props.auth ? 'none' : ''
                            }}
                        >
                            <a href="/auth/google">
                                <div>
                                    <h3>LOG IN</h3>
                                </div>
                            </a>
                        </div>
                        {this.renderMobileAvatar()}
                        {this.renderMobileSidebar()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({
    auth,
    authorized,
    musicKit,
    sidebar,
    newNotifications
}) => {
    return { auth, authorized, musicKit, sidebar, newNotifications };
};

export default connect(
    mapStateToProps,
    {
        isMusicKitAuthorized,
        showSidebar,
        haveNewNotifications,
        fetchAllFollowerPostsCount,
        fetchFollowerPosts,
        viewNotifications
    }
)(Header);
