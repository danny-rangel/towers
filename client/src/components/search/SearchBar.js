import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { searchSongs } from '../../actions';
import './SearchBar.css';

class SearchBar extends React.Component{

    render() {
        return (
            <div id="searchBar" className="ui search">
                <form onSubmit={this.props.handleSubmit(values => this.props.searchSongs(values.searchTerms))} className="ui form">
                    <Field id="innerForm" autoComplete="off" type="text" name="searchTerms" component="input" placeholder="Search"/>
                    {/* <button className="ui icon button">
                        <i className="search icon"></i>
                    </button> */}
                </form>
            </div>
        )
    }
}


export default reduxForm({
    form: 'songForm'
})(connect(null, { searchSongs })(SearchBar));