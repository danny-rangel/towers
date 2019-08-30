import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { searchSongs } from '../../../actions';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const StyledField = styled(Field)`
    padding: 10px;
    flex: 1;
    height: 48px;
    display: inline-flex;
    align-items: center;
    font-size: 1rem;
    box-sizing: border-box;
    line-height: 1.1875em;
    border: none;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const StyledForm = styled.form`
    margin: 20px 0;
    display: flex;
    align-items: center;
    max-width: 500px;
    width: 100%;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: #fff;
`;

const SearchBar = ({ searchFunction, handleSubmit, placeholder }) => {
    return (
        <StyledForm
            onSubmit={handleSubmit(values =>
                searchFunction(values.searchTerms)
            )}
        >
            <StyledField
                autoComplete="off"
                type="text"
                name="searchTerms"
                component="input"
                placeholder={placeholder}
            />
            <IconButton
                aria-label="search"
                onClick={handleSubmit(values =>
                    searchFunction(values.searchTerms)
                )}
            >
                <SearchIcon />
            </IconButton>
        </StyledForm>
    );
};

const validate = ({ searchTerms }) => {
    const errors = {};

    if (!searchTerms || searchTerms.startsWith(' ')) {
        errors.searchTerms = 'You must enter something!';
    }

    return errors;
};

const mapStateToProps = ({ form }) => {
    return { form };
};

export default reduxForm({
    form: 'songForm',
    validate
})(
    connect(
        mapStateToProps,
        { searchSongs }
    )(SearchBar)
);
