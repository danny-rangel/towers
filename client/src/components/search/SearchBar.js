import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { searchSongs } from '../../actions';
import './SearchBar.css';

class SearchBar extends React.Component{

    render() {
        return (
            <div className="item">
                <div id="searchBar" className="ui input">
                    <form id="innerForm" onSubmit={this.props.handleSubmit(values => this.props.searchSongs(values.searchTerms))} className="ui form">
                        <Field  autoComplete="off" type="text" name="searchTerms" component="input" placeholder="Search"/>
                    </form>
                    <button id="searchButton" className="ui inverted white icon button">
                            <i id="searchIcon" className="search icon"></i>
                        </button>
                </div>
            </div>
        )
    }
}


export default reduxForm({
    form: 'songForm'
})(connect(null, { searchSongs })(SearchBar));