import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import './Search.css';

class Search extends Component {
    render() {
        return (
                <div id="searchContainer" className="ui container">
                    <SearchBar />
                    <SearchList />    
                </div>
        );
    }
}

export default Search;