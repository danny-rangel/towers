import React from 'react';
import './PostField.css';
import history from '../../history';
import { connect } from 'react-redux';

const PostField = ({ input, placeholder, fetching }) => {
    return (
        <div>
            <div>
                <div>
                    <textarea
                        maxLength="2000"
                        rows="2"
                        id="caption-input"
                        placeholder={placeholder}
                        {...input}
                    />
                </div>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => history.goBack()}
                    className="negative ui primary button postButton"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={`${fetching ? `disabled` : ``}`}
                >
                    Post
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ fetching }) => {
    return { fetching };
};

export default connect(mapStateToProps)(PostField);
