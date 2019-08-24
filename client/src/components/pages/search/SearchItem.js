import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong, songToPlay } from '../../../actions';
import { Link } from 'react-router-dom';
import secondsFormatted from '../../../utils/secondsFormatted';
import './SearchItem.css';

class SearchItem extends Component {
    state = { loaded: false };

    selectAndPlaySong = song => {
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
        this.props.songToPlay(nowPlaying);
    };

    render() {
        const { song, auth, selectSong } = this.props;
        const { loaded } = this.state;
        return (
            <div>
                <div onClick={() => this.selectAndPlaySong(song)}>
                    <div>
                        <div
                            style={{
                                display: loaded ? 'none' : 'block'
                            }}
                        >
                            <div></div>
                        </div>
                        <img
                            onLoad={() => this.setState({ loaded: true })}
                            style={{ display: loaded ? 'block' : 'none' }}
                            alt={song.attributes.name}
                            src={window.MusicKit.formatArtworkURL(
                                song.attributes.artwork,
                                150,
                                150
                            )}
                        ></img>
                    </div>
                    <div>
                        <div>{song.attributes.name}</div>
                        <div>{song.attributes.artistName}</div>
                    </div>
                    <div>
                        <div>{song.attributes.albumName}</div>
                    </div>
                    <div>
                        <div>
                            {secondsFormatted(
                                song.attributes.durationInMillis / 1000
                            )}
                        </div>
                    </div>
                    <div
                        style={{ display: auth ? 'inline-block' : 'none' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <Link onClick={() => selectSong(song)} to="/posts/new">
                            Post
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(
    mapStateToProps,
    { selectSong, songToPlay }
)(SearchItem);
