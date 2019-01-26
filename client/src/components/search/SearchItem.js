import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong, songToPlay, setIsPlaying, setPercentage, setIntervalId, setIntervalIdFlag, setTime, setMusicKitIsPlaying } from '../../actions';
import { Link } from 'react-router-dom';
import secondsFormatted from '../../utils/secondsFormatted';
import './SearchItem.css'


class SearchItem extends Component {

    selectAndPlaySong= async (song) => {
        if (this.props.intervalIdFlag === null || this.props.intervalIdFlag !== song.id)
        {
            this.props.selectSong(song);
            this.props.songToPlay(song);
            await this.props.musicKit.setQueue({ url: song.attributes.url });
        }

        if (this.props.isPlaying && this.props.intervalIdFlag === this.props.selectedSong.id)
        {
            this.props.musicKit.player.pause();
            this.props.setIsPlaying(false);
            this.props.setMusicKitIsPlaying(false);
            clearInterval(this.props.intervalId);
        } else if (!this.props.isPlaying || this.props.intervalIdFlag !== this.props.selectedSong.id) {
            clearInterval(this.props.intervalId);
            let intervalId = setInterval(() => {
                this.props.setPercentage(this.props.musicKit.player.currentPlaybackTime / this.props.musicKit.player.currentPlaybackDuration);
                this.props.setTime(secondsFormatted(this.props.musicKit.player.currentPlaybackTime));
                this.props.setMusicKitIsPlaying(this.props.musicKit.player.isPlaying);
                if (this.props.percentage >= 1) {
                    this.props.musicKit.player.stop();
                    this.props.setIsPlaying(false);
                    clearInterval(this.props.intervalId);
                }
            }, 400);
            this.props.setIntervalId(intervalId);
            this.props.musicKit.player.play();
            this.props.setIsPlaying(true);
            this.props.setMusicKitIsPlaying(this.props.musicKit.player.isPlaying);
            this.props.setIntervalIdFlag(this.props.selectedSong.id);
        }
    }


    render() {
        return (
            <div id="itemContainer" className="item">
                <div id="searchListItem" onClick={() => this.selectAndPlaySong(this.props.song)} className="ui equal width grid">
                    <div id="albumImageContainer" className="column">
                        <img
                            id="searchAlbumImage"
                            className="ui image" 
                            alt={this.props.song.attributes.name} 
                            src={window.MusicKit.formatArtworkURL(this.props.song.attributes.artwork, 200, 200)}
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
                    <div id="postButton" onClick={(e) => e.stopPropagation()} className="column">
                        <Link onClick={() => this.props.selectSong(this.props.song)} to="/posts/new" className="ui inverted blue button">Post</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ musicKit, selectedSong, songPlaying, intervalId, intervalIdFlag, isPlaying, percentage }) => {
    return { musicKit, selectedSong, songPlaying, intervalId, intervalIdFlag, isPlaying, percentage };
}

export default connect(mapStateToProps, { selectSong, songToPlay, setIsPlaying, setPercentage, setIntervalId, setIntervalIdFlag, setTime, setMusicKitIsPlaying })(SearchItem);