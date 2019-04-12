import React from 'react';
import './PostField.css';
import history from '../../history';
import { connect } from 'react-redux';

const PostField = ({ input, placeholder, fetching }) => {
    return (
        <div id="field" className="extra content" style={{textAlign: 'center'}}>
            <div className="ui form">
                <div className="field">
                    <textarea maxLength="2000" rows="2" id="caption-input" placeholder={placeholder} {...input} />
                </div>
            </div>
            <div style={{ textAlign: 'center' }} id="actionButtons" >
                    <button type="button" onClick={() => history.goBack()} className="negative ui primary button postButton">Cancel</button>
                    <button type="submit" className={`ui primary ${fetching ? `disabled` : ``} button postButton`}>Post</button>
            </div>
        </div>
    );
}

const mapStateToProps = ({ fetching }) => {
    return { fetching };
}

export default connect(mapStateToProps)(PostField);