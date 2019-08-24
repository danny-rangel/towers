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

    state = {
        showButton: false,
        edit: false,
        liked: false,
        showModal: false,
        likeButtonPressed: false,
        loaded: false
    };

    async componentDidMount() {
        const { post, auth } = this.props;

        if (auth) {
            this._isMounted = true;
            const res = await axios.get(
                `/api/postsLike/${auth._id}/${post._id}`
            );
            if (this._isMounted) {
                this.setState({ liked: res.data });
            }
        }
    }

    selectAndPlayPost = ({
        songURL,
        _id,
        songName,
        artistName,
        albumName,
        albumArt
    }) => {
        const { songToPlay } = this.props;

        let nowPlaying = {
            url: songURL,
            id: _id,
            name: songName,
            artist: artistName,
            album: albumName,
            artwork: albumArt,
            played: Math.floor(Math.random() * 1000 + 1)
        };
        songToPlay(nowPlaying);
    };

    async collectAndSubmitLike(likedPost) {
        this.setState({ likeButtonPressed: true });
        const { auth, likePost, post } = this.props;

        const newLike = {
            postId: likedPost._id,
            likerId: auth._id,
            username: auth.username,
            profileImage: auth.profileImage
        };
        await likePost(newLike);
        const res = await axios.get(`/api/postsLike/${auth._id}/${post._id}`);
        if (this._isMounted) {
            this.setState({ liked: res.data });
        }
        this.setState({ likeButtonPressed: false });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {
            post,
            auth,
            songPlaying,
            isPlaying,
            isSongLoading
        } = this.props;
        const { showButton, liked, likeButtonPressed, loaded } = this.state;

        if (!post) {
            return null;
        } else {
            return (
                <div>
                    <div>
                        <div>
                            <Link
                                to={`/posts/delete/${post._id}`}
                                style={{
                                    display:
                                        post.userId === auth._id
                                            ? 'block'
                                            : 'none',
                                    margin: '0 10px 0 0',
                                    fontSize: '16px'
                                }}
                            ></Link>
                            <div>
                                <h4>
                                    <Link to={`/${post.username}`}>
                                        {post.username}
                                    </Link>
                                </h4>
                            </div>
                            <div>
                                <h5>
                                    {moment(
                                        post.date,
                                        moment.ISO_8601
                                    ).fromNow()}
                                </h5>
                            </div>
                        </div>
                        <div
                            onMouseOver={() =>
                                this.setState({ showButton: true })
                            }
                            // onMouseOver={() => this.selectAndPlayPost(post)} AUTO PLAY FUNCTIONALITY ?
                            onMouseOut={() =>
                                this.setState({ showButton: false })
                            }
                            onClick={
                                isSongLoading
                                    ? null
                                    : () => this.selectAndPlayPost(post)
                            }
                        >
                            <img
                                alt={post.songName}
                                src={post.albumArt}
                                onLoad={() => this.setState({ loaded: true })}
                                style={{ display: loaded ? 'block' : 'none' }}
                            ></img>
                            <button
                                style={{
                                    visibility: showButton
                                        ? 'visible'
                                        : 'hidden',
                                    opacity: showButton ? '1' : '0',
                                    transition: showButton
                                        ? 'all .2s ease-in-out'
                                        : 'all .2s ease-in-out',
                                    display: isSongLoading ? 'none' : 'block'
                                }}
                                id="imagePlayButton"
                            >
                                <i
                                    className={
                                        isPlaying && songPlaying.id === post._id
                                            ? 'pause icon'
                                            : 'play icon'
                                    }
                                ></i>
                            </button>
                            {/* <div 
                            className="ui active inverted centered inline loader" 
                            id="songLoader"
                            style={{margin: '0', display: isSongLoading && songPlaying.id === post._id ? 'inline-block' : 'none'}}>
                        </div> */}
                        </div>
                        <div>
                            <h1>{post.songName}</h1>
                            <div>
                                <span>{post.artistName}</span>
                            </div>
                            <div>{post.caption}</div>
                            <span>
                                <i
                                    style={{
                                        color: 'red',
                                        pointerEvents: likeButtonPressed
                                            ? 'none'
                                            : 'auto'
                                    }}
                                    className={
                                        liked
                                            ? 'heart like icon'
                                            : 'heart outline like icon'
                                    }
                                    onClick={
                                        auth
                                            ? () =>
                                                  this.collectAndSubmitLike(
                                                      post
                                                  )
                                            : null
                                    }
                                ></i>
                                <Link
                                    to={`/users/${post._id}`}
                                    style={{
                                        cursor: 'pointer',
                                        display: 'inline-block',
                                        color: 'black'
                                    }}
                                >
                                    {post.likes} likes
                                </Link>
                            </span>
                        </div>
                        <div
                            style={{
                                display:
                                    songPlaying.id === post._id
                                        ? 'block'
                                        : 'none'
                            }}
                        >
                            <ProgressBar />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = ({
    songPlaying,
    isPlaying,
    auth,
    likePost,
    isSongLoading
}) => {
    return { songPlaying, isPlaying, auth, likePost, isSongLoading };
};

export default connect(
    mapStateToProps,
    { songToPlay, likePost }
)(PostItem);
