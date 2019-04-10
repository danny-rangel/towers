import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, fetchMusicInstance, isMusicKitAuthorized, setVolume } from '../actions';
import history from '../history';
import ScrollToTop from './ScrollToTop';
import './App.css';

import Header from './Header';
import Landing from './Landing';
import Home from './Home';
import PostNew from '../components/post/PostNew';
import Search from '../components/search/Search';
import Notifications from './notifications/Notifications';
import Player from './player/Player';
import Profile from './Profile';
import PostDelete from './post/PostDelete';
import EditProfile from './EditProfile';
import UserList from './UserList';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import EditAVI from './EditAVI';
import About from './About';


class App extends Component {

    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 1000))
    }

    async componentDidMount() {
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator')
            if (ele) {
              // fade out
                ele.classList.add('available')
                setTimeout(() => {
                // remove from DOM
                ele.outerHTML = ''
              }, 1000)
            }
        });
        await this.props.fetchUser();
        await this.props.fetchMusicInstance();
        this.props.isMusicKitAuthorized(this.props.musicKit.isAuthorized);
        this.props.musicKit.volume = 1;
        this.props.setVolume(this.props.musicKit.volume);

        if (this.props.auth.username === "") {
            history.push(`/edit/${this.props.auth._id}`);
        }

        // if (!this.props.auth) {
        //     history.push('/');
        // }
    }

    

    render() {
        return (
            <div id="wrapper" className="mainWrapper">
                <Router history={history}>
                    <ScrollToTop>
                    <div style={{minHeight: '100vh'}}>
                        <Header />
                            <div id="bodyContainer">
                                <Switch>
                                    <Route exact path="/" component={Landing}></Route>
                                    <Route exact path="/edit/:id" component={EditProfile}></Route>
                                    <Route exact path="/edit/avi/:id" component={EditAVI}></Route>
                                    <Route exact path="/home" component={Home}></Route>
                                    <Route exact path="/about" component={About}></Route>
                                    <Route path="/search" component={Search}></Route>
                                    <Route exact path="/posts/new" component={PostNew}></Route>
                                    <Route exact path="/posts/delete/:id" component={PostDelete}></Route>
                                    <Route exact path="/notifications" component={Notifications}></Route>
                                    <Route exact path="/:username" component={Profile}></Route>
                                    <Route exact path="/users/:id" component={UserList}></Route>
                                    <Route exact path="/followers/:id" component={FollowerList}></Route>
                                    <Route exact path="/following/:id" component={FollowingList}></Route>
                                </Switch>
                            </div>
                        <Player />
                    </div>
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = ({ musicKit, authorized, auth }) => {
    return { musicKit, authorized, auth };
}

export default connect(mapStateToProps, { fetchUser, fetchMusicInstance, isMusicKitAuthorized, setVolume })(App);