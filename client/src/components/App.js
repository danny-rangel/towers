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
import About from './About';
import Footer from './Footer';
import Player from './player/Player';
import Profile from './Profile';
import PostDelete from './post/PostDelete';
import SignUp from './SignUp';



class App extends Component {

    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 2000))
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
              }, 2000)
            }
          })

        this.props.fetchUser();
        await this.props.fetchMusicInstance();
        this.props.isMusicKitAuthorized(this.props.musicKit.isAuthorized);
        this.props.musicKit.volume = 1;
        this.props.setVolume(this.props.musicKit.volume);
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
                                    <Route exact path="/signup" component={SignUp}></Route>
                                    <Route exact path="/home" component={Home}></Route>
                                    <Route exact path="/search" component={Search}></Route>
                                    <Route exact path="/posts/new" component={PostNew}></Route>
                                    <Route exact path="/posts/delete/:id" component={PostDelete}></Route>
                                    <Route exact path="/about" component={About}></Route>
                                    <Route exact path="/:username" component={Profile}></Route>
                                </Switch>
                            </div>
                            <Footer />
                        <Player />
                    </div>
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = ({ musicKit, authorized }) => {
        return { musicKit, authorized };
}

export default connect(mapStateToProps, { fetchUser, fetchMusicInstance, isMusicKitAuthorized, setVolume })(App);