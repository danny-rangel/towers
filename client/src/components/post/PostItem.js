import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import secondsFormatted from '../../utils/secondsFormatted';
import moment from 'moment';
import ProgressBar from '../player/ProgressBar';
import './PostItem.css';
import { selectPost, songToPlay, setIsPlaying, setPercentage, setIntervalId, setIntervalIdFlag, setTime, 
    setMusicKitIsPlaying, deletePost, likePost } from '../../actions';

class PostItem extends Component {

        
    state = {showButton: false, edit: false};

    selectAndPlayPost = async (post) => {
        if (this.props.intervalIdFlag === null || this.props.intervalIdFlag !== post._id)
        {
            this.props.selectPost(post);
            this.props.songToPlay(post);

            await this.props.musicKit.setQueue({ url: post.songURL });
        }

        if (this.props.isPlaying && this.props.intervalIdFlag === this.props.selectedPost._id)
        {
            this.props.musicKit.player.pause();
            this.props.setIsPlaying(false);
            this.props.setMusicKitIsPlaying(false);
            clearInterval(this.props.intervalId);
            
        } else if (!this.props.isPlaying || this.props.intervalIdFlag !== this.props.selectedPost._id) {
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
            this.props.setIntervalIdFlag(this.props.selectedPost._id);
        } 
    }


    collectAndSubmitLike() {
        const newLike =  {
            postId: this.props.post._id,
            likerId: this.props.auth._id,
            username: this.props.auth.username
        }
        this.props.likePost(newLike);
    }



    render() {
        return (
            
            <div id="postItem" className="item" >
            <div className="ui card" id="listPostCard">
                <div className="content" style={{padding: '10px 0px'}}>
                    <Link 
                        to={`/posts/delete/${this.props.post._id}`}
                        style={{display: this.props.post.username === this.props.auth.username? 'block' : 'none', float: 'right', margin: '0 10px 0 0', fontSize: '15px'}}
                        >
                        <i id="rightTrashIcon" className="trash alternate outline icon meta"></i>
                    </Link>
                    <br></br>
                    <div className="center floated meta"><h4><Link to={`/${this.props.post.username}`}>{this.props.post.username}</Link></h4></div>
                    <div className="center floated meta"><h5>{moment(this.props.post.date, moment.ISO_8601).fromNow()}</h5></div>
                </div>
                <div 
                    onMouseOver={() => this.setState({ showButton: true})} 
                    // onMouseOver={() => this.selectAndPlayPost(post)} AUTO PLAY FUNCTIONALITY???
                    onMouseOut={() => this.setState({ showButton: false})} 
                    id="imageContainer" 
                    onClick={() => this.selectAndPlayPost(this.props.post)} 
                    className="image">
                    <img alt={this.props.post.songName} src={this.props.post.albumArt}></img>
                    <button 
                        style={{
                            visibility: this.state.showButton? 'visible' : 'hidden',
                            opacity: this.state.showButton? '1' : '0',
                            transition: this.state.showButton? 'all .2s ease-in-out' : 'all .2s ease-in-out'
                        }}
                        id="imagePlayButton" >
                        <i id="buttonIcon" className={this.props.isPlaying && this.props.songPlaying._id === this.props.post._id ? "pause icon": "play icon"}></i>
                    </button>
                </div>
                <div className="content">
                    <h1 style={{wordWrap: 'break-word'}} className="header">{this.props.post.songName}</h1>
                    <div style={{wordWrap: 'break-word'}}  className="meta">
                        <span className="date">{this.props.post.artistName}</span>
                    </div>
                    <div style={{wordWrap: 'break-word'}} className="description">
                        {this.props.post.caption}
                    </div>
                    <span className="left floated">
                        <i className="heart outline like icon" onClick={() => this.collectAndSubmitLike()}></i>
                        {this.props.post.likes} likes
                    </span>
                </div>
                <div className="ui bottom attached progress" style={{display: this.props.songPlaying._id === this.props.post._id ? 'block': 'none'}}>
                    <ProgressBar /> 
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = ({ musicKit, selectedPost, songPlaying, intervalId, intervalIdFlag, isPlaying, percentage, musicKitIsPlaying, auth, likePost }) => {
    return { musicKit, selectedPost, songPlaying, intervalId, intervalIdFlag, isPlaying, percentage, musicKitIsPlaying, auth, likePost };
}

export default connect(mapStateToProps, { selectPost, songToPlay, setIsPlaying, setPercentage, setIntervalId, 
    setIntervalIdFlag, setTime, setMusicKitIsPlaying, deletePost, likePost })(PostItem);