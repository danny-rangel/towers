import React, { Component } from 'react';
import './Player.css';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import secondsFormatted from '../../utils/secondsFormatted';
import { setPercentage, setIsPlaying, setIntervalId, setVolume, 
    setTime, setMusicKitIsPlaying, setIntervalIdFlag, songLoading } from '../../actions';

class Player extends Component {

    state = { oldVolume: null, buffered: null };

    setProgress = () => {
        this.setState({buffered: this.props.musicKit.player.currentBufferedProgress});
        this.props.songLoading((this.props.musicKit.player.playbackState !== 8 && this.props.musicKit.player.playbackState !== 0) ? false : true);
    }

    playSong = async () => {
        
        if (this.props.intervalIdFlag === null || this.props.intervalIdFlag !== this.props.songPlaying.id)
        {
            this.props.songLoading(true);
            await this.props.musicKit.setQueue({ url: this.props.songPlaying.url });
        }

        if (this.props.isPlaying && this.props.intervalIdFlag === this.props.songPlaying.id)
        {
                await this.props.musicKit.player.pause();
                this.props.setIsPlaying(false);
                this.props.setMusicKitIsPlaying(false);
                clearInterval(this.props.intervalId);
            
        } else if (!this.props.isPlaying || this.props.intervalIdFlag !== this.props.songPlaying.id) {
            clearInterval(this.props.intervalId);
            let intervalId = setInterval(async () => {
                this.setProgress();
                this.props.setPercentage(this.props.musicKit.player.currentPlaybackTime / this.props.musicKit.player.currentPlaybackDuration);
                this.props.setTime(secondsFormatted(this.props.musicKit.player.currentPlaybackTime));
                await this.props.setMusicKitIsPlaying(this.props.musicKit.player.isPlaying);
                if (this.props.percentage >= 1) {
                    await this.props.musicKit.player.stop();
                    this.props.setIsPlaying(false);
                    clearInterval(this.props.intervalId);
                     
                }
            }, 500);
                this.props.setIntervalId(intervalId);
                await this.props.musicKit.player.play();
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
            this.props.setVolume(this.props.musicKit.player.volume);
        } else {
            this.setState({ oldVolume:  this.props.musicKit.player.volume});
            this.props.musicKit.player.mute();
            this.props.setVolume(0);
        }
    }


    renderPlayer() {
        return (
            <>
            <div id="player" className="ui fixed bottom sticky">
                <div id="volumeControls" >
                    <div id="muteButton" >
                        <button style={{color: 'white', background: 'none'}} id="muteButton" onClick={this.changeSongVolume} >
                            <i className={this.props.volume === 0 ? 'volume off icon': 'volume up icon'}></i>
                        </button>
                    </div>
                    <div id="volumeBar" >
                        <VolumeBar />
                    </div>
                </div>
                <div id="playerSongInfo" >
                    <div id="songName" >{this.props.songPlaying.name}</div>
                    <div id="artistName" >{this.props.songPlaying.artist}</div>
                </div>
                <div id="playerAlbumArt" >
                    <img
                        id="playerAlbumImage"
                        className="ui image" 
                        alt={this.props.songPlaying.name} 
                        src={this.props.songPlaying.artwork}
                        >
                    </img>
                </div>
                <div>
                    <div id="playButton" >
                        <button 
                            style={{color: 'white', background: 'none', display: this.props.isSongLoading && this.props.isPlaying ? 'none' : 'inline-block' }}
                            id="playButton"
                            onClick={() => this.playSong()} >
                            <i className={!this.props.isSongLoading && this.props.isPlaying ? 'pause icon': 'play icon'}></i>
                        </button>
                        <div 
                            className="ui active inverted centered inline loader" 
                            style={{margin: '0', display: this.props.isSongLoading ? 'inline-block' : 'none'}}>
                        </div>
                    </div>
                </div>
                <div id="playBackInfo">
                    <div id="currentTime" >
                        {this.props.time}
                    </div>
                    <div id="progressBar" >
                        <ProgressBar />
                    </div>
                    <div id="totalTime" >
                        {secondsFormatted(this.props.musicKit.player.currentPlaybackDuration)}
                    </div>
                </div>
            </div>

            <div id="mobilePlayer" className="ui fixed bottom sticky">
                <div id="playerAlbumArt" >
                    <img
                        id="playerAlbumImage"
                        className="ui image" 
                        alt={this.props.songPlaying.name} 
                        src={this.props.songPlaying.artwork}
                        >
                    </img>
                </div>
                <div id="playerSongInfo" >
                    <div id="songName" >{this.props.songPlaying.name}</div>
                    <div id="artistName" >{this.props.songPlaying.artist}</div>
                </div>
                <div id="playButton">
                    <button 
                        style={{ color: 'white', background: 'none', display: this.props.isSongLoading && this.props.isPlaying ? 'none' : 'inline-block' }}
                        id="playButton" 
                        onClick={() => this.playSong()} >
                        <i className={!this.props.isSongLoading && this.props.isPlaying ? 'pause icon': 'play icon'}></i>
                    </button>
                    <div 
                            className="ui active inverted centered inline loader" 
                            style={{margin: '0', display: this.props.isSongLoading ? 'inline-block' : 'none'}}>
                        </div>
                </div>
            </div>
            </>
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

const mapStateToProps = ({ songPlaying, percentage, isPlaying, musicKit, intervalId, 
    intervalIdFlag, volume, time, musicKitIsPlaying, isSongLoading }) => {
    return { songPlaying, percentage, isPlaying, musicKit, intervalId, 
        intervalIdFlag, volume, time, musicKitIsPlaying, isSongLoading };
}

export default connect(mapStateToProps, { setPercentage, setIsPlaying, setIntervalId, setVolume, 
    setTime, setMusicKitIsPlaying, setIntervalIdFlag, songLoading })(Player);