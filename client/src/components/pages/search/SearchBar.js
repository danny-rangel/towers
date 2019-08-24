import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { searchSongs } from '../../../actions';
import './SearchBar.css';

class SearchBar extends React.Component {
    render() {
        const { searchFunction, handleSubmit, placeholder } = this.props;

        return (
            <div>
                <div>
                    <form
                        onSubmit={handleSubmit(values =>
                            searchFunction(values.searchTerms)
                        )}
                    >
                        <Field
                            autoComplete="off"
                            type="text"
                            name="searchTerms"
                            component="input"
                            placeholder={placeholder}
                        />
                    </form>
                    <button
                        onClick={handleSubmit(values =>
                            searchFunction(values.searchTerms)
                        )}
                    >
                        Search
                    </button>
                </div>
            </div>
        );
    }
}

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
