import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Landing from './Landing';
const Home = () => <h2>Home</h2>
const PostNew = () => <h2>PostNew</h2>
const Search = () => <h2>Search</h2>

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                            <Route exact path="/" component={Landing}></Route>
                            <Route exact path="/home" component={Home}></Route>
                            <Route exact path="/search" component={Search}></Route>
                            <Route exact path="/posts/new" component={PostNew}></Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, { fetchUser })(App);