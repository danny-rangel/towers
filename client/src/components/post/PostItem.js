import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { songToPlay, likePost, deletePost } from '../../actions';

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
import Dialog from '@material-ui/core/Dialog';
import StyledButton from '../styled/Button';

const StyledCard = styled(Card)`
    && {
        width: 99%;
        max-width: 525px;
        margin: 20px 0;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }
`;

const StyledMedia = styled(CardMedia)`
    && {
        height: 0;
        padding-top: 100%;
    }
`;

const StyledSpan = styled.span`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 20px 0px;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
    && {
        color: ${(props) =>
            props.isliked ? '#ff0000' : 'rgba(0, 0, 0, 0.54)'};
    }
`;

const StyledDialog = styled(Dialog)`
    && {
        .MuiPaper-root.MuiPaper-elevation24.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-rounded {
            width: 100%;
        }
    }
`;

const PostItem = ({
    post,
    auth,
    songToPlay,
    likePost,
    songPlaying,
    isPlaying,
    isSongLoading,
    deletePost,
    refetchPosts,
}) => {
    const [liked, setLiked] = useState(false);
    const [likeButtonPressed, setLikeButtonPressed] = useState(false);
    const [popperOpen, setPopperOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchPostLikes = async () => {
        const res = await axios.get(`/api/postsLike/${auth._id}/${post._id}`);
        return res.data;
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setPopperOpen(!popperOpen);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectAndDeletePost = async (id) => {
        await deletePost({ _id: id });
        handleClose();
        refetchPosts();
    };

    useEffect(() => {
        let isMounted = true;
        if (auth && isMounted) {
            fetchPostLikes().then((res) => {
                setLiked(res ? res : false);
            });
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const selectAndPlayPost = ({
        songURL,
        _id,
        songName,
        artistName,
        albumName,
        albumArt,
    }) => {
        let nowPlaying = {
            url: songURL,
            id: _id,
            name: songName,
            artist: artistName,
            album: albumName,
            artwork: albumArt,
            played: Math.floor(Math.random() * 1000 + 1),
        };
        songToPlay(nowPlaying);
    };

    const collectAndSubmitLike = async (likedPost) => {
        setLikeButtonPressed(true);

        const newLike = {
            postId: likedPost._id,
            likerId: auth._id,
            username: auth.username,
            profileImage: auth.profileImage,
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
                            onClick={(e) => handleClick(e)}
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
                                <ListItem
                                    button
                                    key={`delete ${post._id}`}
                                    onClick={handleClickOpen}
                                >
                                    <DeleteIcon style={{ color: '#00d9c5' }} />
                                    <ListItemText primary={'Delete'} />
                                </ListItem>
                            </List>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <StyledMedia image={post.albumArt} title={post.songName} />
            <CardContent>
                <h5
                    style={{ color: 'rgba(0, 0, 0, 0.7)', marginBottom: '5px' }}
                >
                    <i>{post.caption}</i>
                </h5>
                <Link to={`/${post.username}`}>
                    <h4>{post.username}</h4>
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
                <Link to={`/users/${post._id}`}>{post.likes} likes</Link>
            </CardActions>
            <StyledDialog
                onClick={(e) => e.stopPropagation()}
                onClose={handleClose}
                aria-labelledby="new-post-dialog"
                open={open}
            >
                <h4 style={{ padding: '20px' }}>
                    {`Are you sure you want to delete ${post.songName} by ${
                        post.artistName
                    }?`}
                </h4>
                <StyledSpan>
                    <StyledButton
                        backgroundcolor="primary"
                        onClick={handleClose}
                        width="115px"
                    >
                        Cancel
                    </StyledButton>
                    <StyledButton
                        backgroundcolor="primary"
                        type="submit"
                        width="115px"
                        onClick={() => selectAndDeletePost(post._id)}
                    >
                        Delete
                    </StyledButton>
                </StyledSpan>
            </StyledDialog>
        </StyledCard>
    );
};

const mapStateToProps = ({
    songPlaying,
    isPlaying,
    auth,
    likePost,
    isSongLoading,
}) => {
    return { songPlaying, isPlaying, auth, likePost, isSongLoading };
};

export default connect(
    mapStateToProps,
    { songToPlay, likePost, deletePost }
)(PostItem);
