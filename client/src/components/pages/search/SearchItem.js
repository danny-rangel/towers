import React from 'react';
import { connect } from 'react-redux';
import { selectSong, songToPlay } from '../../../actions';
import styled from 'styled-components';
import media from '../../styled/media';
import StyledButton from '../../styled/Button';

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

const SearchItem = ({ song, auth, selectSong, songToPlay }) => {
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

            {/* <div
                style={{ display: auth ? 'inline-block' : 'none' }}
                onClick={e => e.stopPropagation()}
            > */}

            <Button backgroundcolor="primary">Post</Button>

            {/* <Link onClick={() => selectSong(song)} to="/posts/new">
                    Post
                </Link> */}
            {/* </div> */}
            {/* </div> */}
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
