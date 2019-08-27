import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Volume from './Volume';
import Progress from './Progress';
import secondsFormatted from '../../utils/secondsFormatted';
import useInterval from './useInterval';
import {
    setPercentage,
    setIsPlaying,
    setVolume,
    setTime,
    setIntervalIdFlag,
    songLoading
} from '../../actions';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const StyledAppBar = styled(AppBar)`
    && {
        bottom: 0;
        top: auto;
        height: 50px;
        display: flex;
        flex-direction: row;
        background-color: #ffffff;
        color: #000000;
        align-items: center;
        justify-content: space-around;
    }
`;

const StyledSongInfo = styled.span`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
`;

const Player = ({
    musicKit,
    songLoading,
    isPlaying,
    intervalIdFlag,
    songPlaying,
    setIsPlaying,
    setPercentage,
    setTime,
    percentage,
    setIntervalIdFlag,
    volume,
    setVolume,
    isSongLoading,
    time
}) => {
    const [oldVolume, setOldVolume] = useState(null);
    const [delay, setDelay] = useState(null);

    useEffect(() => {
        if (isPlaying) {
            setDelay(250);
        } else {
            setDelay(null);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (songPlaying.played) {
            playSong();
        }
    }, [songPlaying.played]);

    useInterval(async () => {
        songLoading(
            intervalIdFlag !== songPlaying.id && !isPlaying ? true : false
        );
        setPercentage(
            musicKit.player.currentPlaybackTime /
                musicKit.player.currentPlaybackDuration
        );
        setTime(secondsFormatted(musicKit.player.currentPlaybackTime));
        if (percentage >= 1) {
            await musicKit.player.stop();
            setIsPlaying(false);
            setPercentage(0);
        }
    }, delay);

    const playSong = async () => {
        if (intervalIdFlag === null || intervalIdFlag !== songPlaying.id) {
            songLoading(true);
            await musicKit.setQueue({
                url: songPlaying.url
            });
        }

        if (isPlaying && intervalIdFlag === songPlaying.id) {
            await musicKit.player.pause();
            setIsPlaying(false);
        } else if (!isPlaying || intervalIdFlag !== songPlaying.id) {
            await musicKit.player.play();
            setIsPlaying(true);
            setIntervalIdFlag(songPlaying.id);
        }
    };

    const changeSongVolume = () => {
        if (volume === 0) {
            musicKit.player.volume = oldVolume;
            setVolume(musicKit.player.volume);
        } else {
            setOldVolume(musicKit.player.volume);
            musicKit.player.mute();
            setVolume(0);
        }
    };

    const renderPlayer = () => {
        return (
            <>
                <IconButton onClick={changeSongVolume}>
                    {volume === 0 ? (
                        <VolumeOffIcon style={{ color: '#00d9c5' }} />
                    ) : (
                        <VolumeUpIcon style={{ color: '#00d9c5' }} />
                    )}
                </IconButton>
                <Volume />
                <StyledSongInfo>
                    <span>{songPlaying.name}</span>
                    <span>{songPlaying.artist}</span>
                </StyledSongInfo>
                <img
                    alt={songPlaying.name}
                    src={songPlaying.artwork}
                    style={{ width: '48px', height: '48px' }}
                ></img>

                {isPlaying ? (
                    <IconButton
                        aria-label="pause"
                        disabled={isSongLoading}
                        onClick={() => {
                            playSong();
                        }}
                    >
                        <PauseIcon style={{ color: '#00d9c5' }} />
                    </IconButton>
                ) : (
                    <IconButton
                        aria-label="play"
                        disabled={isSongLoading}
                        onClick={() => {
                            playSong();
                        }}
                    >
                        <PlayArrowIcon style={{ color: '#00d9c5' }} />
                    </IconButton>
                )}

                <span style={{ fontSize: '10px' }}>{time}</span>
                <Progress />
                <span style={{ fontSize: '10px' }}>
                    {secondsFormatted(musicKit.player.currentPlaybackDuration)}
                </span>
            </>
        );
    };

    if (songPlaying.name === '') {
        return null;
    } else {
        return <StyledAppBar position="fixed">{renderPlayer()}</StyledAppBar>;
    }
};

const mapStateToProps = ({
    songPlaying,
    percentage,
    isPlaying,
    musicKit,
    intervalIdFlag,
    volume,
    time,
    isSongLoading
}) => {
    return {
        songPlaying,
        percentage,
        isPlaying,
        musicKit,
        intervalIdFlag,
        volume,
        time,
        isSongLoading
    };
};

export default connect(
    mapStateToProps,
    {
        setPercentage,
        setIsPlaying,
        setVolume,
        setTime,
        setIntervalIdFlag,
        songLoading
    }
)(Player);
