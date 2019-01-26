import React, { Component } from 'react';
import './Player.css';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import secondsFormatted from '../../utils/secondsFormatted';
import { setPercentage, setIsPlaying, setIntervalId, setVolume, setTime, setMusicKitIsPlaying, setIntervalIdFlag } from '../../actions';

class Player extends Component {

    state = { oldVolume: null };


    playSong = async () => {
        if (this.props.intervalIdFlag === null || this.props.intervalIdFlag !== this.props.songPlaying.id)
        {
            await this.props.musicKit.setQueue({ url: this.props.songPlaying.url });
        }

        if (this.props.isPlaying && this.props.intervalIdFlag === this.props.songPlaying.id)
        {
            this.props.musicKit.player.pause();
            this.props.setIsPlaying(false);
            this.props.setMusicKitIsPlaying(false);
            clearInterval(this.props.intervalId);
            
        } else if (!this.props.isPlaying || this.props.intervalIdFlag !== this.props.songPlaying.id) {
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
            this.props.setIntervalIdFlag(this.props.songPlaying.id);
        } 
    }


    componentDidUpdate(prevProps) {
        if (prevProps.songPlaying.played !== this.props.songPlaying.played) {
            this.playSong();
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
                            <div id="songname" className="item">{this.props.songPlaying.name}</div>
                            <div id="artistname" className="item">{this.props.songPlaying.artist}</div>
                        </div>
                        <div id="playerAlbumArt" className="center aligned column two wide column player">
                            <img
                                id="playerAlbumImage"
                                className="ui image" 
                                alt={this.props.songPlaying.name} 
                                src={this.props.songPlaying.artwork}
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




    render() {
        if (this.props.songPlaying.name === '')
        {
            return null;
        }
        else {
            return (
                <div>
                    {this.renderPlayer()}
                </div>
            );
        } 
    }
};

const mapStateToProps = ({ songPlaying, percentage, isPlaying, musicKit, intervalId, intervalIdFlag, volume, time }) => {
    return { songPlaying, percentage, isPlaying, musicKit, intervalId, intervalIdFlag, volume, time }
}

export default connect(mapStateToProps, { setPercentage, setIsPlaying, setIntervalId, setVolume, setTime, setMusicKitIsPlaying, setIntervalIdFlag })(Player);