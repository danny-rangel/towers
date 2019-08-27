import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import history from '../../../history';
import { searchSongs, searchUsers } from '../../../actions';

import Wrapper from '../../styled/Wrapper';
import SearchList from './SearchList';
import SearchUserList from './SearchUserList';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Search = ({ searchSongs, searchUsers, match }) => {
    const [showUserSearch, setShowUserSearch] = useState(false);
    const [showSongSearch, setShowSongSearch] = useState(true);
    const [value, setValue] = useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
        if (newValue === 0) {
            history.push('/search/songs');
        } else if (newValue === 1) {
            history.push('/search/users');
        }
    }

    useEffect(() => {
        if (history.location.pathname.slice(8) === 'users') {
            setShowUserSearch(true);
            setShowSongSearch(false);
        } else {
            setShowSongSearch(true);
            setShowUserSearch(false);
        }
    }, [match]);

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`
        };
    }

    return (
        <Wrapper>
            <h1>Search</h1>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs"
                >
                    <Tab label="Songs" {...a11yProps(0)} />
                    <Tab label="Users" {...a11yProps(1)} />
                </Tabs>
            </AppBar>

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
        </Wrapper>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(
    mapStateToProps,
    { searchSongs, searchUsers }
)(Search);
