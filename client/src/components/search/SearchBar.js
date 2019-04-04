import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { searchSongs } from '../../actions';
import './SearchBar.css';

class SearchBar extends React.Component{


    render() {
        const { searchFunction, handleSubmit, placeholder } = this.props;

        return (
            <div className="item">
                <div id="searchBar" className="ui input">
                    <form id="innerForm" onSubmit={handleSubmit(values => searchFunction(values.searchTerms))} className="ui form error">
                        <Field  autoComplete="off" type="text" name="searchTerms" component="input" placeholder={placeholder}/>
                    </form>
                    <button onClick={handleSubmit(values => searchFunction(values.searchTerms))} id="searchButton" className="ui inverted white icon button">
                        <i id="searchIcon" className="search icon"></i>
                    </button>
                </div>
            </div>
        );
    }
}


const validate = (formValues) => {
    const errors = {};

    if (!formValues.searchTerms || formValues.searchTerms.startsWith(' ')) {
        errors.searchTerms = 'You must enter something!';
    }

    return errors;
};

const mapStateToProps = ({ form }) => {
    return { form };
}


export default reduxForm({
    form: 'songForm',
    validate
})(connect(mapStateToProps, { searchSongs })(SearchBar));