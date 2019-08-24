import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchUser,
    fetchMusicInstance,
    isMusicKitAuthorized,
    setVolume
} from '../actions';
import history from '../history';
import ScrollToTop from './ScrollToTop';
import './App.css';
import * as Sentry from '@sentry/browser';

import Header from './Header';
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import PostNew from '../components/post/PostNew';
import Search from './pages/search/Search';
import Notifications from './pages/notifications/Notifications';
import Player from './player/Player';
import Profile from './pages/profile/Profile';
import PostDelete from './post/PostDelete';
import EditProfile from './pages/profile/EditProfile';
import UserList from './pages/search/UserList';
import FollowerList from './pages/profile/FollowerList';
import FollowingList from './pages/profile/FollowingList';
import EditAVI from './pages/profile/EditAVI';

class App extends Component {
    async componentDidMount() {
        try {
            await this.props.fetchUser();
            await this.props.fetchMusicInstance();
        } catch (err) {
            Sentry.captureException(err);
        }

        this.props.isMusicKitAuthorized(this.props.musicKit.isAuthorized);
        this.props.musicKit.volume = 1;
        this.props.setVolume(this.props.musicKit.volume);

        if (this.props.auth.username === '') {
            history.push(`/edit/${this.props.auth._id}`);
        }

        // if (!this.props.auth) {
        //     history.push('/');
        // }
    }

    render() {
        return (
            <Router history={history}>
                <ScrollToTop>
                    <div className="wrapper">
                        <Header />
                        <div>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={Landing}
                                ></Route>
                                <Route
                                    exact
                                    path="/edit/:id"
                                    component={EditProfile}
                                ></Route>
                                <Route
                                    exact
                                    path="/edit/avi/:id"
                                    component={EditAVI}
                                ></Route>
                                <Route
                                    exact
                                    path="/home"
                                    component={Home}
                                ></Route>
                                <Route
                                    path="/search"
                                    component={Search}
                                ></Route>
                                <Route
                                    exact
                                    path="/posts/new"
                                    component={PostNew}
                                ></Route>
                                <Route
                                    exact
                                    path="/posts/delete/:id"
                                    component={PostDelete}
                                ></Route>
                                <Route
                                    exact
                                    path="/notifications"
                                    component={Notifications}
                                ></Route>
                                <Route
                                    exact
                                    path="/:username"
                                    component={Profile}
                                ></Route>
                                <Route
                                    exact
                                    path="/users/:id"
                                    component={UserList}
                                ></Route>
                                <Route
                                    exact
                                    path="/followers/:id"
                                    component={FollowerList}
                                ></Route>
                                <Route
                                    exact
                                    path="/following/:id"
                                    component={FollowingList}
                                ></Route>
                            </Switch>
                        </div>
                        <Player />
                    </div>
                </ScrollToTop>
            </Router>
        );
    }
}

const mapStateToProps = ({ musicKit, authorized, auth }) => {
    return { musicKit, authorized, auth };
};

export default connect(
    mapStateToProps,
    { fetchUser, fetchMusicInstance, isMusicKitAuthorized, setVolume }
)(App);
