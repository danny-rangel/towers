import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong, songToPlay } from '../../actions';
import { Link } from 'react-router-dom';
import secondsFormatted from '../../utils/secondsFormatted';
import './SearchItem.css'


class SearchItem extends Component {

    state = { loaded: false };

    selectAndPlaySong = (song) => {
        let nowPlaying = {
            url : song.attributes.url,
            id : song.id,
            name : song.attributes.name,
            artist : song.attributes.artistName,
            album : song.attributes.albumName,
            artwork : window.MusicKit.formatArtworkURL(song.attributes.artwork, 50, 50),
            played: Math.floor((Math.random() * 1000) + 1)
        }
        this.props.songToPlay(nowPlaying);
    }


    render() {
        const { song, auth, selectSong } = this.props;
        const { loaded } = this.state;
        return (
            <div id="itemContainer" className="item">
                <div id="searchListItem" onClick={() => this.selectAndPlaySong(song)} >
                    <div id="albumImageContainer">
                        <div className="ui placeholder" style={{display: loaded ? 'none' : 'block', width: '150px'}}>
                            <div className="square image" ></div>
                        </div>
                        <img
                            id="searchAlbumImage"
                            className="ui image" 
                            onLoad={() => this.setState({ loaded: true })} style={{display: loaded ? 'block' : 'none'}}
                            alt={song.attributes.name} 
                            src={window.MusicKit.formatArtworkURL(song.attributes.artwork, 150, 150)}
                            >
                        </img>
                    </div>
                    <div id="searchListSongInfo" >
                        <div className="header" id="songName" >
                            {song.attributes.name}
                        </div>
                        <div id="artistName">
                            {song.attributes.artistName}
                        </div>
                    </div>
                    <div id="searchListSongAlbumInfo" >
                        <div className="header" >
                            {song.attributes.albumName}
                        </div>
                    </div>
                    <div id="searchListSongTime" >
                        <div className="header" >
                            {secondsFormatted(song.attributes.durationInMillis / 1000)}
                        </div>
                    </div>
                    <div 
                        style={{display: auth ? 'inline-block': 'none' }} 
                        id="postButton" 
                        onClick={(e) => e.stopPropagation()} 
                        className="column"
                    >
                        <Link onClick={() => selectSong(song)} to="/posts/new" className="ui inverted blue button">Post</Link>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}


export default connect(mapStateToProps, { selectSong, songToPlay })(SearchItem);