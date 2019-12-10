import React, { useState, useEffect } from 'react';
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
import Search from './pages/search/Search';
import Notifications from './pages/notifications/Notifications';
import Player from './player/Player';
import Profile from './pages/profile/Profile';
import PostDelete from './post/PostDelete';
import EditProfile from './pages/profile/EditProfile';
import EditAVI from './pages/profile/EditAVI';
import Loader from './styled/Loader';
import Listener from './pages/profile/Listener';
import Listening from './pages/profile/Listening';
import Likers from './post/Likers';

const App = ({
    fetchUser,
    fetchMusicInstance,
    isMusicKitAuthorized,
    musicKit,
    setVolume,
    auth
}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            await fetchUser();
            await fetchMusicInstance();
            setLoading(false);
        };

        try {
            fetchUserInfo();
        } catch (err) {
            Sentry.captureException(err);
        }

        isMusicKitAuthorized(musicKit.isAuthorized);
        musicKit.volume = 1;
        setVolume(musicKit.volume);

        if (auth) {
            if (auth.username === '') {
                history.push(`/edit/${auth._id}`);
            }
        }
    }, [auth]);

    if (loading) {
        return <Loader height="40px" width="40px" />;
    } else {
        return (
            <Router history={history}>
                <ScrollToTop>
                    <div className="wrapper light">
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Landing}></Route>
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
                            <Route exact path="/home" component={Home}></Route>
                            <Route path="/search" component={Search}></Route>
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
                                component={Likers}
                            ></Route>
                            <Route
                                exact
                                path="/followers/:id"
                                component={Listener}
                            ></Route>
                            <Route
                                exact
                                path="/following/:id"
                                component={Listening}
                            ></Route>
                        </Switch>

                        <Player />
                    </div>
                </ScrollToTop>
            </Router>
        );
    }
};

const mapStateToProps = ({ musicKit, authorized, auth }) => {
    return { musicKit, authorized, auth };
};

export default connect(mapStateToProps, {
    fetchUser,
    fetchMusicInstance,
    isMusicKitAuthorized,
    setVolume
})(App);
