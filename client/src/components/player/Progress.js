import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import ValueLabel from './ValueLabel';

const StyledProgress = styled(Slider)`
    && {
        max-width: 300px;
        width: 90%;
        color: #00d9c5;

        .MuiSlider-thumb {
            background-color: #00d9c5;
        }
    }
`;

const Progress = ({ musicKit, percentage }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(percentage * 100);
    }, [percentage]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        musicKit.player.seekToTime(
            musicKit.player.currentPlaybackDuration / (100 / newValue)
        );
    };

    return (
        <StyledProgress
            value={value}
            ValueLabelComponent={ValueLabel}
            valueLabelDisplay="auto"
            onChange={handleChange}
            aria-label="progress-slider"
            defaultValue={0}
        />
    );
};

const mapStateToProps = ({ percentage, musicKit }) => {
    return { percentage, musicKit };
};

export default connect(mapStateToProps)(Progress);
