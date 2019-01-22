import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, fetchMusicInstance } from '../actions';
import history from '../history';
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
const PostEdit = () => {};
const PostDelete = () => {};



class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchMusicInstance();
    }

    render() {
        return (
            <div id="wrapper" className="mainWrapper">
                <Router history={history}>
                    <div style={{minHeight: '100vh'}}>
                        <Header />
                            <div id="bodyContainer">
                                <Switch>
                                    <Route exact path="/" component={Landing}></Route>
                                    <Route exact path="/home" component={Home}></Route>
                                    <Route exact path="/search" component={Search}></Route>
                                    <Route exact path="/posts/new" component={PostNew}></Route>
                                    <Route exact path="/posts/edit/:id" component={PostEdit}></Route>
                                    <Route exact path="/posts/delete/:id" component={PostDelete}></Route>
                                    <Route exact path="/about" component={About}></Route>
                                    <Route exact path="/:username" component={Profile}></Route>
                                </Switch>
                            </div>
                            <Footer />
                        <Player />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = ({ musicKit }) => {
        return { musicKit };
}

export default connect(mapStateToProps, { fetchUser, fetchMusicInstance })(App);