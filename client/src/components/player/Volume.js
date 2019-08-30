import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import { setVolume } from '../../actions';

const StyledVolume = styled(Slider)`
    && {
        max-width: 100px;
        width: 90%;
        color: #00d9c5;

        .MuiSlider-thumb {
            background-color: #00d9c5;
        }
    }
`;

const Volume = ({ musicKit, setVolume }) => {
    const [value, setValue] = useState(musicKit.player.volume * 100);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        musicKit.player.volume = newValue / 100;
        setVolume(musicKit.player.volume);
    };

    return (
        <StyledVolume
            value={value}
            onChange={handleChange}
            aria-labelledby="volume-bar"
        />
    );
};

const mapStateToProps = ({ musicKit }) => {
    return { musicKit };
};

export default connect(
    mapStateToProps,
    { setVolume }
)(Volume);
