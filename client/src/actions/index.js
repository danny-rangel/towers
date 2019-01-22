import axios from 'axios';
import AppleMusic from '../apis/appleMusic';
import history from '../history';
import { FETCH_USER, FETCH_MUSIC_INSTANCE, SEARCH_SONGS, SELECT_SONG, SUBMIT_POST, 
    FETCH_POSTS, CHECK_USER, FETCH_ALL_POSTS, FETCH_USER_POSTS, FOLLOW_USER, SELECT_POST, SONG_TO_PLAY,
    SET_PERCENTAGE, SET_IS_PLAYING, SET_VOLUME, SET_INTERVAL_ID, SET_INTERVAL_ID_FLAG, SET_TIME, SET_MUSICKIT_IS_PLAYING } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllPosts = () => async dispatch => {
    const res = await axios.get('/api/posts');
    dispatch({ type: FETCH_ALL_POSTS, payload: res.data })
}

export const checkUser = (user) => async dispatch => {
    const res = await axios.post('/api/users',user);
    dispatch({ type: CHECK_USER, payload: res.data });
};

export const fetchMusicInstance = () => {
    const res = window.MusicKit.configure({
        developerToken: process.env.REACT_APP_APPLE_DEV_KEY,
        app: {
            name: 'Towers',
            build: '1.0.0'
        }
    });
    console.log(process.env.REACT_APP_APPLE_DEV_KEY);
    window.MusicKit.getInstance();

    return { type: FETCH_MUSIC_INSTANCE, payload: res };
};

export const searchSongs = (term) => async dispatch => {
    const res = await AppleMusic.get('/search', {
        params: {
            term: term,
            limit: 20
        }
    });
    dispatch({ type: SEARCH_SONGS, payload: res.data.results.songs.data });
};

export const selectSong = (song) => {
    return { type: SELECT_SONG, payload: song}
}

export const selectPost = (post) => {
    return { type: SELECT_POST, payload: post}
}

export const submitPost = (post) => async dispatch => {
    const res = await axios.post('/api/posts', post);

    dispatch({ type: SUBMIT_POST, payload: res });
    history.push('/home');
}


export const fetchPosts = () => async dispatch => {
    const res = await axios.get('/api/posts/user');
    dispatch({ type: FETCH_POSTS, payload: res.data })
}

export const fetchUserPosts = (user) => async dispatch => {
    const res = await axios.post('/api/posts/user', user);
    dispatch({ type: FETCH_USER_POSTS, payload: res.data });
}

export const followUser = (body) => async dispatch => {
    const res = await axios.post('/api/follow', body);
    dispatch({ type: FOLLOW_USER, payload: res.data });
}

export const songToPlay = (song) => {
    return { type: SONG_TO_PLAY, payload: song }
}

export const setPercentage = (percentage) => {
    return { type: SET_PERCENTAGE, payload: percentage }
}


export const setIsPlaying = (playing) => {
    return { type: SET_IS_PLAYING, payload: playing }
}

export const setMusicKitIsPlaying = (playing) => {
    return { type: SET_MUSICKIT_IS_PLAYING, payload: playing }
}

export const setIntervalId = (intervalId) => {

    return { type: SET_INTERVAL_ID, payload: intervalId }
}

export const setIntervalIdFlag = (value) => {

    return { type: SET_INTERVAL_ID_FLAG, payload: value }
}

export const setVolume = (volume) => {
    return { type: SET_VOLUME, payload: volume }
}

export const setTime = (time) => {
    return { type: SET_TIME, payload: time }
}