import React, { Component } from 'react';
import './Player.css';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import secondsFormatted from '../../utils/secondsFormatted';
import { setPercentage, setIsPlaying, setIntervalId, setVolume, setTime } from '../../actions';

class Player extends Component {

    state = { oldVolume: null };

    playSong = () => {
        if (this.props.isPlaying)
        {
            this.props.musicKit.pause();
            this.props.setIsPlaying(false);
            clearInterval(this.props.intervalId);
        } else if (!this.props.isPlaying) {
            let intervalId = setInterval(() => {
                this.props.setPercentage(this.props.musicKit.player.currentPlaybackTime / this.props.musicKit.player.currentPlaybackDuration);
                this.props.setTime(secondsFormatted(this.props.musicKit.player.currentPlaybackTime));

                if (this.props.percentage >= 1) {
                    this.props.musicKit.stop();
                    this.props.setIsPlaying(false);
                    clearInterval(this.props.intervalId);
                }
            }, 400);

            this.props.setIntervalId(intervalId);
            this.props.musicKit.play();
            this.props.setIsPlaying(true);
        }
    }


    changeSongVolume = () => {
        if (this.props.volume === 0)
        {
            this.props.musicKit.player.volume = this.state.oldVolume;
            this.props.setVolume(0.5);
        } else {
            this.setState({ oldVolume:  this.props.musicKit.player.volume});
            this.props.musicKit.player.mute();
            this.props.setVolume(0);
        }
    }

    renderPlayer () {
        if (!this.props.songPlaying)
        {
            return null;
        }
        else if (this.props.songPlaying.type === 'songs') {
            return (
                <div id="player" className="ui fixed bottom sticky">
                    <div id="playerContentRow" className="ui grid">
                        <div id="muteButton" className="left aligned column two wide column player">
                            <button id="muteButton" onClick={() => this.changeSongVolume()} ><i className={this.props.volume === 0 ? 'volume off icon': 'volume up icon'}></i></button>
                        </div>
                        <div id="volumeBar" className="left aligned column two wide column player">
                            <VolumeBar />
                        </div>
                        <div id="playerSongInfo" className="left aligned column three wide column player">
                            <div id="songname" className="item">{this.props.songPlaying.attributes.name}</div>
                            <div id="artistname" className="item">{this.props.songPlaying.attributes.artistName}</div>
                        </div>
                        <div id="playerAlbumArt" className="center aligned column two wide column player">
                            <img
                                id="playerAlbumImage"
                                className="ui image" 
                                alt={this.props.songPlaying.attributes.name} 
                                src={window.MusicKit.formatArtworkURL(this.props.songPlaying.attributes.artwork)}
                                >
                            </img>
                        </div>
                        <div id="playButton" className="left aligned column three wide column player">
                            <button id="playButton" onClick={() => this.playSong()} ><i className={this.props.isPlaying ? 'pause icon': 'play icon'}></i></button>
                        </div>
                        <div id="currentTime" className="center aligned column one wide column player">
                            {this.props.time}
                        </div>
                        <div id="progressBar" className="center aligned column two wide column player">
                            <ProgressBar />
                        </div>
                        <div id="totalTime" className="center aligned column one wide column player">
                            {secondsFormatted(this.props.musicKit.player.currentPlaybackDuration)}
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.songPlaying.type === 'post') {
            return (
                <div id="player" className="ui fixed bottom sticky">
                    <div id="playerContentRow" className="ui grid">
                        <div id="muteButton" className="left aligned column two wide column player">
                            <button id="muteButton" onClick={() => this.changeSongVolume()} ><i className={this.props.volume === 0 ? 'volume off icon': 'volume up icon'}></i></button>
                        </div>
                        <div id="volumeBar" className="left aligned column two wide column player">
                            <VolumeBar />
                        </div>
                        <div id="playerSongInfo" className="left aligned column three wide column player">
                            <div id="songname" className="item">{this.props.songPlaying.songName}</div>
                            <div id="artistname" className="item">{this.props.songPlaying.artistName}</div>
                        </div>
                        <div id="playerAlbumArt" className="center aligned column two wide column player">
                            <img
                                id="playerAlbumImage"
                                className="ui image" 
                                alt={this.props.songPlaying.songName} 
                                src={this.props.songPlaying.albumArt}
                                >
                            </img>
                        </div>
                        <div id="playButton" className="left aligned column three wide column player">
                            <button id="playButton" onClick={() => this.playSong()} ><i className={this.props.isPlaying ? 'pause icon': 'play icon'}></i></button>
                        </div>
                        <div id="currentTime" className="center aligned column one wide column player">
                            {this.props.time}
                        </div>
                        <div id="progressBar" className="center aligned column two wide column player">
                            <ProgressBar />
                        </div>
                        <div id="totalTime" className="center aligned column one wide column player">
                            {secondsFormatted(this.props.musicKit.player.currentPlaybackDuration)}
                        </div>
                    </div>
                </div>
            );
        }
    }


    render() {
        return (
            <div>{this.renderPlayer()}</div>
        );
    }
};

const mapStateToProps = ({ songPlaying, percentage, isPlaying, musicKit, intervalId, volume, time }) => {
    return { songPlaying, percentage, isPlaying, musicKit, intervalId, volume, time }
}

export default connect(mapStateToProps, { setPercentage, setIsPlaying, setIntervalId, setVolume, setTime })(Player);