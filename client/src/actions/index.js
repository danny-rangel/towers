import axios from 'axios';
import AppleMusic from '../apis/appleMusic';
import history from '../history';


import { FETCH_USER, FETCH_MUSIC_INSTANCE, SEARCH_SONGS, SELECT_SONG, SUBMIT_POST, 
    FETCH_POST, CHECK_USER, FETCH_ALL_POSTS, FETCH_USER_POSTS, FOLLOW_USER, SELECT_POST, SONG_TO_PLAY,
    SET_PERCENTAGE, SET_IS_PLAYING, SET_VOLUME, SET_INTERVAL_ID, SET_INTERVAL_ID_FLAG, SET_TIME, 
    SET_MUSICKIT_IS_PLAYING, IS_MUSIC_KIT_AUTHORIZED, DELETE_POST, FETCH_FOLLOWER_POSTS, LIKE_POST, IS_FETCHING,
    SHOW_SIDEBAR, IS_FOLLOWING, UPDATE_PROFILE, FETCH_NOTIFICATIONS, VIEW_NOTIFICATIONS, HAVE_NEW_NOTIFICATIONS, FETCH_POST_LIKES,
    FETCH_FOLLOWERS, FETCH_FOLLOWING, UPDATE_AVI, CONTINUE_FETCH_FOLLOWER_POSTS, CONTINUE_FETCH_USER_POSTS, 
    FETCH_ALL_FOLLOWER_POSTS_COUNT, FETCH_ALL_USER_POSTS_COUNT, SEARCH_USERS, CLEAR_USER_STATE, 
    CLEAR_POSTS_STATE, SONG_LOADING } from './types';



export const showSidebar = (bool) => {
    return { type: SHOW_SIDEBAR, payload: bool}
}


export const isFetching = (bool) => {
    return { type: IS_FETCHING, payload: bool}
}

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllPosts = () => async dispatch => {
    const res = await axios.get('/api/posts');
    dispatch({ type: FETCH_ALL_POSTS, payload: res.data })
};


export const checkUser = (username) => async dispatch => {
    const res = await axios.get(`/api/user/${username}`);
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
    window.MusicKit.getInstance();

    return { type: FETCH_MUSIC_INSTANCE, payload: res };
};

export const isMusicKitAuthorized = (authorization) => {
    return { type : IS_MUSIC_KIT_AUTHORIZED, payload: authorization };
};




export const searchSongs = (term) => async dispatch => {
    dispatch(isFetching(true));
    const res = await AppleMusic.get('/search', {
        params: {
            term: term,
            limit: 20
        }
    });
    //FIX UNDEFINED RES.DATA IF NO RESULTS, CHECK API
    
    dispatch({ type: SEARCH_SONGS, payload: res.data.results.songs.data});
    dispatch(isFetching(false));
};

export const searchUsers = (username) => async dispatch => {
    dispatch(isFetching(true));
    const res = await axios.get(`/api/users/${username}`);
    
    dispatch({ type: SEARCH_USERS, payload: res.data });
    dispatch(isFetching(false));
};



export const selectSong = (song) => {
    return { type: SELECT_SONG, payload: song}
}

export const selectPost = (post) => {
    return { type: SELECT_POST, payload: post}
}

export const submitPost = (post) => async dispatch => {
    await axios.post('/api/posts', post);
    dispatch({ type: SUBMIT_POST });
    history.push('/home');
}


export const deletePost = (post) => async dispatch => {
    const res = await axios.delete('/api/postDelete',{ data: post});
    dispatch({ type: DELETE_POST, payload: res.data });
    history.push('/home');
}



export const fetchNotifications = () => async dispatch => {
    const res = await axios.get('/api/notifications/user');
    dispatch({ type: FETCH_NOTIFICATIONS, payload: res.data })
}

export const fetchPost = (params) => async dispatch => {
    const res = await axios.get(`/api/posts/${params.id}`);
    dispatch({ type: FETCH_POST, payload: res.data[0] })
}


export const fetchAllFollowerPostsCount = () => async dispatch => {
    const res = await axios.get(`/api/followPosts`);
    dispatch({ type: FETCH_ALL_FOLLOWER_POSTS_COUNT, payload: res.data });
}


export const fetchFollowerPosts = (page = 0, take = 20) => async dispatch => {
    const res = await axios.get(`/api/followPosts/${page}/${take}`);
    dispatch({ type: FETCH_FOLLOWER_POSTS, payload: res.data });
}

export const continuefetchFollowerPosts = (page, take) => async dispatch => {
    const res = await axios.get(`/api/followPosts/${page}/${take}`);
    dispatch({ type: CONTINUE_FETCH_FOLLOWER_POSTS, payload: res.data });
}



export const fetchUserPosts = (username, page = 0, take = 20) => async dispatch => {
    const res = await axios.get(`/api/posts/${username}/${page}/${take}`);
    dispatch({ type: FETCH_USER_POSTS, payload: res.data });
}

export const continuefetchUserPosts = (username, page, take) => async dispatch => {
    const res = await axios.get(`/api/posts/${username}/${page}/${take}`);
    dispatch({ type: CONTINUE_FETCH_USER_POSTS, payload: res.data });
}



export const fetchAllUserPostsCount = (username) => async dispatch => {
    const res = await axios.get(`/api/postCount/${username}`);
    dispatch({ type: FETCH_ALL_USER_POSTS_COUNT, payload: res.data });
}

export const followUser = (body) => async dispatch => {
    const res = await axios.post('/api/follow', body);
    dispatch({ type: FOLLOW_USER, payload: res.data });
}

export const fetchFollowers = (id) => async dispatch => {
    const res = await axios.get(`/api/followers/${id}`);
    dispatch({ type: FETCH_FOLLOWERS, payload: res.data });
}

export const fetchFollowing = (id) => async dispatch => {
    const res = await axios.get(`/api/following/${id}`);
    dispatch({ type: FETCH_FOLLOWING, payload: res.data });
}

export const likePost = (like) => async dispatch => {
    const res = await axios.post('/api/postsLike', like);
    dispatch({ type: LIKE_POST, payload: res.data }); 
}

export const fetchPostLikes = (id) => async dispatch => {
    const res = await axios.get(`/api/postsLike/${id}`);
    dispatch({ type: FETCH_POST_LIKES, payload: res.data }); 
}


export const isFollowing = (username) => async dispatch => {
    const res = await axios.get(`/api/follow/${username}`);
    dispatch({ type: IS_FOLLOWING, payload: res.data });
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

export const updateProfile = (profile) => async dispatch => {

    try {
        const res = await axios.patch(`/api/user/${profile.id}`, profile);
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
        history.push(`/${profile.username}`);
    } catch (err) {
        console.log('ERR', err);
        
    }
    
}

// export const updateAVI = (formData, username) => async dispatch => {
export const updateAVI = (user) => async dispatch => {
    // const res = await axios.patch(`/api/avi`, formData, config);
    dispatch({ type: UPDATE_AVI, payload: user });
    history.push(`/${user.username}`);
}

export const viewNotifications = () => async dispatch => {
    await axios.post('/api/notifications');
    dispatch({ type: VIEW_NOTIFICATIONS })
}

export const haveNewNotifications = () => async dispatch => {
    const res = await axios.get('/api/notifications');
    dispatch({ type: HAVE_NEW_NOTIFICATIONS, payload: res.data });
}

export const clearUserState = () => {
    return { type: CLEAR_USER_STATE };
}

export const clearPostsState = () => {
    return { type: CLEAR_POSTS_STATE };
}

export const songLoading = (isLoading) => {
    return { type: SONG_LOADING, payload: isLoading };
}
