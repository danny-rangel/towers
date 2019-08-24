import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import history from '../../../history';
import { searchSongs, searchUsers } from '../../../actions';
import './Search.css';
import SearchList from './SearchList';
import SearchUserList from './SearchUserList';

const Search = ({ searchSongs, searchUsers, match }) => {
    const [showUserSearch, setShowUserSearch] = useState(false);
    const [showSongSearch, setShowSongSearch] = useState(true);

    const switchSongActive = () => {
        if (!showSongSearch) {
            setShowSongSearch(true);
            setShowUserSearch(false);
        }
    };

    const switchUserActive = () => {
        if (!showUserSearch) {
            setShowUserSearch(true);
            setShowSongSearch(false);
        }
    };

    useEffect(() => {
        if (history.location.pathname.slice(8) === 'users') {
            setShowUserSearch(true);
            setShowSongSearch(false);
        } else {
            setShowSongSearch(true);
            setShowUserSearch(false);
        }
    }, [match]);

    return (
        <div>
            <div>
                <h1>Search</h1>
            </div>
            <div>
                <Link
                    to="/search/songs"
                    onClick={switchSongActive}
                    className={`${showSongSearch ? `active` : ``}`}
                >
                    Songs
                </Link>
                <Link
                    to="/search/users"
                    onClick={switchUserActive}
                    className={`${showUserSearch ? `active` : ``}`}
                >
                    Users
                </Link>
            </div>
            <SearchBar
                placeholder={
                    showSongSearch ? 'Search songs' : 'Search by username'
                }
                searchFunction={showSongSearch ? searchSongs : searchUsers}
            />
            <Route exact path="/search/songs" component={SearchList}></Route>
            <Route
                exact
                path="/search/users"
                component={SearchUserList}
            ></Route>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(
    mapStateToProps,
    { searchSongs, searchUsers }
)(Search);
