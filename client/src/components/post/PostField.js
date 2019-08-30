import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
    height: 50px;
    max-height: 50px;
    width: 65%;
    max-width: 280px;
    margin: 10px;
    border-radius: 2px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
        rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
    padding: 10px;
    font-size: 1rem;
`;

const PostField = ({ input, placeholder }) => {
    return (
        <StyledTextArea
            maxLength="2000"
            rows="2"
            id="caption-input"
            placeholder={placeholder}
            {...input}
        />
    );
};

export default PostField;
