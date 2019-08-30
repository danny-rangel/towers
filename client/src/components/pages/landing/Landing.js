import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import media from '../../styled/media';
import history from '../../../history';
import './Landing.css';

import Paper from '@material-ui/core/Paper';
import StyledButton from '../../styled/Button';

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        'friends music'
        'form form';
    align-items: center;

    ${media.medium`
        grid-template-rows: 165px 80px 1fr;
        grid-template-columns: 1fr;
        grid-template-areas:
            "friends"
            "music"
            "form";
    `}
`;

const StyledPaper = styled(Paper)`
    && {
        grid-area: form;
        width: 90%;
        height: 350px;
        max-width: 350px;
        box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.43);
        justify-self: center;
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        ${media.small`
            align-self: center;
        `}
    }
`;

const StyledText = styled.h1`
    justify-self: center;
    font-size: 3.2rem;
    color: #000000;
`;

const Landing = ({ auth }) => {
    useEffect(() => {
        if (auth) {
            history.push('/home');
        }
    }, [auth]);

    return (
        <StyledDiv className="background">
            <StyledText className="friends" style={{ gridArea: 'friends' }}>
                Good Friends
            </StyledText>
            <StyledText style={{ gridArea: 'music' }}>Good Music</StyledText>
            <StyledPaper>
                <svg className="logo"></svg>

                <StyledButton
                    href="/auth/google"
                    backgroundcolor="primary"
                    margin="15px 0"
                >
                    Log In
                </StyledButton>
                <StyledButton
                    href="/auth/google"
                    backgroundcolor="primary"
                    margin="15px 0"
                >
                    Sign Up
                </StyledButton>
            </StyledPaper>
        </StyledDiv>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps)(Landing);
