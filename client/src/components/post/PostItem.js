import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import './PostItem.css';
import { songToPlay, likePost } from '../../actions';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import DeleteIcon from '@material-ui/icons/Delete';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledCard = styled(Card)`
    && {
        width: 99%;
        max-width: 525px;
        margin: 20px 0;
    }
`;

const StyledMedia = styled(CardMedia)`
    && {
        height: 0;
        padding-top: 100%;
    }
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
    && {
        color: ${props => (props.isliked ? '#ff0000' : 'rgba(0, 0, 0, 0.54)')};
    }
`;

const PostItem = ({
    post,
    auth,
    songToPlay,
    likePost,
    songPlaying,
    isPlaying,
    isSongLoading
}) => {
    const [liked, setLiked] = useState(false);
    const [likeButtonPressed, setLikeButtonPressed] = useState(false);
    const [popperOpen, setPopperOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const fetchPostLikes = async () => {
        const res = await axios.get(`/api/postsLike/${auth._id}/${post._id}`);
        return res.data;
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
        setPopperOpen(!popperOpen);
    };

    useEffect(() => {
        if (auth) {
            fetchPostLikes().then(res => {
                setLiked(res ? res : false);
            });
        }
    }, []);

    const selectAndPlayPost = ({
        songURL,
        _id,
        songName,
        artistName,
        albumName,
        albumArt
    }) => {
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

    const collectAndSubmitLike = async likedPost => {
        setLikeButtonPressed(true);

        const newLike = {
            postId: likedPost._id,
            likerId: auth._id,
            username: auth.username,
            profileImage: auth.profileImage
        };

        await likePost(newLike);
        const res = await axios.get(`/api/postsLike/${auth._id}/${post._id}`);
        setLiked(res.data ? res.data : false);
        setLikeButtonPressed(false);
    };

    return (
        <StyledCard>
            <CardHeader
                action={
                    post.userId === auth._id ? (
                        <IconButton
                            aria-label="settings"
                            onClick={e => handleClick(e)}
                        >
                            <MoreVertIcon style={{ color: '#00d9c5' }} />
                        </IconButton>
                    ) : null
                }
                title={post.songName}
                subheader={post.artistName}
            />
            <Popper
                open={popperOpen}
                anchorEl={anchorEl}
                placement={'bottom-end'}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{ width: '150px', height: '64px' }}>
                            <List>
                                <Link
                                    to={`/posts/delete/${post._id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#000000'
                                    }}
                                >
                                    <ListItem button key={`delete ${post._id}`}>
                                        <DeleteIcon
                                            style={{ color: '#00d9c5' }}
                                        />
                                        <ListItemText primary={'Delete'} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <StyledMedia image={post.albumArt} title={post.songName} />
            <CardContent>
                <Link
                    style={{ textDecoration: 'none' }}
                    to={`/${post.username}`}
                >
                    <h4 style={{ color: '#000000' }}>{post.username}</h4>
                </Link>
                <h5 style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                    {moment(post.date, moment.ISO_8601).fromNow()}
                </h5>
            </CardContent>
            <CardActions disableSpacing>
                {isPlaying && songPlaying.id === post._id ? (
                    <IconButton
                        aria-label="pause"
                        disabled={isSongLoading}
                        onClick={() => {
                            selectAndPlayPost(post);
                        }}
                    >
                        <PauseIcon style={{ color: '#00d9c5' }} />
                    </IconButton>
                ) : (
                    <IconButton
                        aria-label="play"
                        disabled={isSongLoading}
                        onClick={() => {
                            selectAndPlayPost(post);
                        }}
                    >
                        <PlayArrowIcon style={{ color: '#00d9c5' }} />
                    </IconButton>
                )}
                <IconButton
                    aria-label="add to favorites"
                    disabled={!auth || likeButtonPressed}
                    onClick={() => {
                        collectAndSubmitLike(post);
                    }}
                >
                    <StyledFavoriteIcon isliked={liked ? 1 : undefined} />
                </IconButton>
                <Link
                    to={`/users/${post._id}`}
                    style={{ textDecoration: 'none', color: '#000000' }}
                >
                    {post.likes} likes
                </Link>
            </CardActions>
        </StyledCard>
    );
};

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
