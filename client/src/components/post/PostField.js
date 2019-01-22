import React from 'react';
import './PostField.css';

const PostField = ({ input, placeholder }) => {
    return (
        <div className="extra content" style={{textAlign: 'center'}}>
            <div className="ui large transparent left icon input">
                <input id="caption-input" placeholder={placeholder} {...input} />
            </div>
        </div>
    );
}

export default PostField;