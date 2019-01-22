import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import secondsFormatted from '../../utils/secondsFormatted';
import moment from 'moment';
import { selectPost, songToPlay, setIsPlaying, setPercentage, setIntervalId, setIntervalIdFlag, setTime, setMusicKitIsPlaying } from '../../actions';
import './PostList.css';


class PostList extends Component {
    
    state = {showButton: false};

    selectAndPlayPost = async (post) => {
        if (this.props.intervalIdFlag === null || this.props.intervalIdFlag !== post._id)
        {
            this.props.selectPost(post);
            this.props.songToPlay(post);
            await this.props.musicKit.setQueue({ url: post.songURL });
            
        }

        if (this.props.musicKit.player.isPlaying && this.props.intervalIdFlag === this.props.selectedPost._id)
        {
            
            this.props.musicKit.pause();
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
                    this.props.musicKit.stop();
                    this.props.setIsPlaying(false);
                    clearInterval(this.props.intervalId);
                }
            }, 400);


            this.props.setIntervalId(intervalId);
            this.props.musicKit.play();
            this.props.setIsPlaying(true);
            this.props.setMusicKitIsPlaying(this.props.musicKit.player.isPlaying);
            this.props.setIntervalIdFlag(this.props.selectedPost._id);
        } 

    }




    renderPosts() {
        return this.props.posts.map(post => {
            return (
                <div id="postItem" className="item" key={post._id} >
                    <div  className="ui card" id="listPostCard">
                        <div className="content" style={{padding: '10px 0px'}}>
                            <div className="center floated meta"><h4><Link to={`/${post.username}`}>{post.username}</Link></h4></div>
                            <div className="center floated meta"><h5>{moment(post.date, moment.ISO_8601).fromNow()}</h5></div>
                        </div>
                        <div 
                            onMouseOver={() => this.setState({ showButton: true})} 
                            onMouseOut={() => this.setState({ showButton: false})} 
                            id="imageContainer" 
                            onClick={() => this.selectAndPlayPost(post)} 
                            className="image">
                            <img alt={post.songName} src={post.albumArt}></img>
                            <button 
                                style={{
                                    visibility: this.state.showButton? 'visible' : 'hidden',
                                    opacity: this.state.showButton? '1' : '0',
                                    transition: this.state.showButton? 'all .2s ease-in-out' : 'all .2s ease-in-out'
                                }}
                                id="imagePlayButton" >
                                <i id="buttonIcon" className={this.props.isPlaying && this.props.songPlaying._id === post._id ? "pause icon": "play icon"}></i>
                            </button>
                        </div>
                        <div className="content">
                            <h1 className="header">{post.songName}</h1>
                            <div className="meta">
                                <span className="date">{post.artistName}</span>
                            </div>
                            <div className="description">
                                {post.caption}
                            </div>
                            <span className="right floated">
                            {/* <i className="heart outline like icon"></i>
                            {post.likes} likes */}
                            </span>
                        </div>
                    </div>
                </div>
            );
        })
    }


    render() {
        return (
            <div  className="ui container">
                <div id="postListContainer" className="ui relaxed list">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ musicKit, selectedPost, songPlaying, intervalId, intervalIdFlag, isPlaying, percentage, musicKitIsPlaying }) => {
    return { musicKit, selectedPost, songPlaying, intervalId, intervalIdFlag, isPlaying, percentage, musicKitIsPlaying };
}


export default connect(mapStateToProps, { selectPost, songToPlay, setIsPlaying, setPercentage, setIntervalId, setIntervalIdFlag, setTime, setMusicKitIsPlaying })(PostList);