import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ProgressBar from '../player/ProgressBar';
import './PostItem.css';
import { songToPlay, likePost } from '../../actions';

class PostItem extends Component {

    _isMounted = false;

    state = { showButton: false, edit: false, liked: false };

    async componentDidMount() {
        if (!this.props.post) {
            return null;
        } 
        // else {
        // this._isMounted = true;
        // const res = await axios.get(`/api/postsLike/${this.props.auth._id}/${this.props.post._id}`);
        // if (this._isMounted) {this.setState({ liked: res.data })};
        // }
    }


    selectAndPlayPost = (post) => {
        let nowPlaying = {
            url : post.songURL,
            id : post._id,
            name : post.songName,
            artist : post.artistName,
            album : post.albumName,
            artwork : post.albumArt,
            played: Math.floor((Math.random() * 1000) + 1)
        }
        this.props.songToPlay(nowPlaying);
    }


    async collectAndSubmitLike(post) {
        const newLike =  {
            postId: post._id,
            likerId: this.props.auth._id,
            username: this.props.auth.username,
            image: this.props.auth.profileImage
        }
        await this.props.likePost(newLike);
        const res = await axios.get(`/api/postsLike/${this.props.auth._id}/${this.props.post._id}`);
        if (this._isMounted) {this.setState({ liked: res.data })};
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        if (!this.props.post) {
            return null;
        } else {
        return (
            <div id="postItem" className="item" >
                <div className="ui card" id="listPostCard">
                    <div className="content" style={{padding: '10px 0px'}}>
                        <Link 
                            to={`/posts/delete/${this.props.post._id}`}
                            className="right aligned meta"
                            style={{display: this.props.post.userId === this.props.auth._id ? 'block' : 'none', margin: '0 10px 0 0', fontSize: '16px'}}
                            >
                            <i id="rightTrashIcon" className="trash alternate outline icon meta"></i>
                        </Link>
                        <div className="center aligned meta"><h4><Link to={`/${this.props.post.username}`}>{this.props.post.username}</Link></h4></div>
                        <div className="center aligned meta"><h5>{moment(this.props.post.date, moment.ISO_8601).fromNow()}</h5></div>
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
                            <i id="buttonIcon" className={this.props.isPlaying && this.props.songPlaying.id === this.props.post._id ? "pause icon": "play icon"}></i>
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
                            <i 
                                style={{color: 'red'}}
                                className={this.state.liked ? 'heart like icon' : 'heart outline like icon'} 
                                onClick={() => this.collectAndSubmitLike(this.props.post)}>
                            </i>
                            {this.props.post.likes} likes
                        </span>
                    </div>
                    <div className="ui bottom attached progress" style={{display: this.props.songPlaying.id === this.props.post._id ? 'block': 'none'}}>
                        <ProgressBar /> 
                    </div>
                </div>
            </div>
        );
    }
}
}

const mapStateToProps = ({ songPlaying, isPlaying, auth, likePost }) => {
    return { songPlaying, isPlaying, auth, likePost };
}

export default connect(mapStateToProps, { songToPlay, likePost })(PostItem);