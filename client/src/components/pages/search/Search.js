import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import history from '../../../history';
import { searchSongs, searchUsers } from '../../../actions';
import styled from 'styled-components';

import Wrapper from '../../styled/Wrapper';
import SearchSongsList from './SearchSongsList';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserList from '../../styled/UserList';

const StyledTabBar = styled(AppBar)`
    && {
        width: 100%;
        max-width: 500px;
        background-color: #ffffff;
        margin: 20px 0;
    }
`;

const StyledTab = styled(Tab)`
    && {
        color: #00d9c5;
        font-size: 1rem;
    }
`;

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
            setValue(1);
            setShowUserSearch(true);
            setShowSongSearch(false);
        } else {
            setValue(0);
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
            <h1 style={{ alignSelf: 'center' }}>Search</h1>
            <StyledTabBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="full width tabs"
                    TabIndicatorProps={{
                        style: { backgroundColor: '#00d9c5' }
                    }}
                >
                    <StyledTab label="Songs" {...a11yProps(0)} />
                    <StyledTab label="Users" {...a11yProps(1)} />
                </Tabs>
            </StyledTabBar>

            <SearchBar
                placeholder={
                    showSongSearch ? 'Search songs' : 'Search by username'
                }
                searchFunction={showSongSearch ? searchSongs : searchUsers}
            />
            <Route
                exact
                path="/search/songs"
                component={SearchSongsList}
            ></Route>
            <Route exact path="/search/users" component={UserList}></Route>
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
