import React, { Component } from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

const StyledSpan = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 10px 0;
`;

const StyledInput = styled.input`
    border: none;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    padding: 10px;
    border-radius: 4px;
`;

class EditInputs extends Component {
    lower = value => value && value.toLowerCase();

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div style={{ color: '#f40000', margin: '5px 0' }}>{error}</div>
            );
        }
    };

    renderUsernameInput = ({ input, meta }) => {
        return (
            <>
                <StyledInput {...input} />
                {this.renderError(meta)}
            </>
        );
    };

    renderAboutMeInput = ({ input, meta }) => {
        return (
            <>
                <StyledInput {...input} />
                {this.renderError(meta)}
            </>
        );
    };

    render() {
        return (
            <>
                <StyledSpan>
                    <h4 style={{ margin: '0 0 6px 0' }}>Username</h4>
                    <Field
                        autoComplete="off"
                        type="text"
                        name="username"
                        component={this.renderUsernameInput}
                        placeholder="Username"
                        normalize={this.lower}
                    ></Field>
                </StyledSpan>
                <StyledSpan>
                    <h4 style={{ margin: '0 0 6px 0' }}>About Me</h4>
                    <Field
                        autoComplete="off"
                        type="text"
                        name="aboutme"
                        component={this.renderAboutMeInput}
                        placeholder="About Me"
                        rows="4"
                    ></Field>
                </StyledSpan>
            </>
        );
    }
}

export default EditInputs;
