import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import { connect } from 'react-redux';
import './Search.css';
import Spinner from '../Spinner';

class Search extends Component {
    render() {
        if (this.props.fetching) {
            return <Spinner />
        }
        return (
                <div id="searchContainer" className="ui container">
                    <SearchBar />
                    <SearchList />    
                </div>
        );
    }
}

const mapStateToProps = ({ fetching }) => {
    return { fetching }; 
}

export default connect(mapStateToProps)(Search);