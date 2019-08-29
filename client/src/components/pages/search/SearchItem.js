import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectSong, songToPlay } from '../../../actions';
import styled from 'styled-components';
import media from '../../styled/media';
import StyledButton from '../../styled/Button';
import Dialog from '@material-ui/core/Dialog';
import PostForm from '../../post/PostForm';

const StyledItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid #f0ecec;

    :nth-last-child(1) {
        border-bottom: none;
    }

    :hover {
        cursor: pointer;
        background-color: #f3f3f3;
    }
`;

const Button = styled(StyledButton)`
    && {
        flex: 0 1 120px;
        max-width: 120px;
        width: 100%;

        ${media.medium`
            flex: 0 1 60px;
        `}
    }
`;

const StyledSongText = styled.div`
    flex: 1 1;
    margin: 0 10px;
`;

const StyledDialog = styled(Dialog)`
    && {
        .MuiPaper-root.MuiPaper-elevation24.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-rounded {
            margin: 20px;
        }
    }
`;

const SearchItem = ({ song, auth, selectSong, songToPlay }) => {
    const [open, setOpen] = useState(false);

    const selectAndPlaySong = song => {
        let nowPlaying = {
            url: song.attributes.url,
            id: song.id,
            name: song.attributes.name,
            artist: song.attributes.artistName,
            album: song.attributes.albumName,
            artwork: window.MusicKit.formatArtworkURL(
                song.attributes.artwork,
                50,
                50
            ),
            played: Math.floor(Math.random() * 1000 + 1)
        };
        songToPlay(nowPlaying);
    };

    const handleClickOpen = (e, song) => {
        e.stopPropagation();
        selectSong(song);
        setOpen(true);
    };

    const handleClose = e => {
        e.stopPropagation();
        setOpen(false);
    };

    return (
        <StyledItem onClick={() => selectAndPlaySong(song)}>
            <img
                style={{
                    width: '80px',
                    height: '80px',
                    flex: '0 0 80px'
                }}
                alt={song.attributes.name}
                src={window.MusicKit.formatArtworkURL(
                    song.attributes.artwork,
                    150,
                    150
                )}
            ></img>

            <StyledSongText>
                <h4>{song.attributes.name}</h4>
                <h5 style={{ color: '#7f7f7f' }}>
                    {song.attributes.artistName}
                </h5>
            </StyledSongText>
            <Button
                backgroundcolor="primary"
                onClick={e => handleClickOpen(e, song)}
            >
                Post
            </Button>
            <StyledDialog
                onClick={e => e.stopPropagation()}
                onClose={handleClose}
                aria-labelledby="new-post-dialog"
                open={open}
            >
                <PostForm handleClose={handleClose} />
            </StyledDialog>
        </StyledItem>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(
    mapStateToProps,
    { selectSong, songToPlay }
)(SearchItem);
