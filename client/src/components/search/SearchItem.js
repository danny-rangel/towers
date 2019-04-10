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
        return (
            <div id="itemContainer" className="item">
                <div id="searchListItem" onClick={() => this.selectAndPlaySong(this.props.song)} className="ui equal width grid">
                    <div id="albumImageContainer" className="column">
                        <div className="ui placeholder" style={{display: this.state.loaded ? 'none' : 'block', width: '150px'}}>
                            <div className="square image" ></div>
                        </div>
                        <img
                            id="searchAlbumImage"
                            className="ui image" 
                            onLoad={() => this.setState({ loaded: true })} style={{display: this.state.loaded ? 'block' : 'none'}}
                            alt={this.props.song.attributes.name} 
                            src={window.MusicKit.formatArtworkURL(this.props.song.attributes.artwork, 150, 150)}
                            >
                        </img>
                    </div>
                    <div id="searchListSongInfoContainer" className="column">
                        <div id="searchListSongInfo" className="content" >
                            <div className="header" >
                                {this.props.song.attributes.name}
                            </div>
                            {this.props.song.attributes.artistName}
                        </div>
                    </div>
                    <div id="searchListSongAlbumInfoContainer" className="column">
                        <div id="searchListSongAlbumInfo" className="content" >
                            <div className="header" >
                                {this.props.song.attributes.albumName}
                            </div>
                        </div>
                    </div>
                    <div id="searchListSongTimeContainer" className="column">
                        <div id="searchListSongTime" className="content" >
                            <div className="header" >
                                {secondsFormatted(this.props.song.attributes.durationInMillis / 1000)}
                            </div>
                        </div>
                    </div>
                    <div style={{display: this.props.auth ? 'inline-block': 'none' }} id="postButton" onClick={(e) => e.stopPropagation()} className="column">
                        <Link onClick={() => this.props.selectSong(this.props.song)} to="/posts/new" className="ui inverted blue button">Post</Link>
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