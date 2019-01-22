import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import musickitReducer from './musickitReducer';
import searchSongsReducer from './searchSongsReducer';
import selectSongReducer from './selectSongReducer';
import submitPostReducer from './submitPostReducer';
import fetchPosts from './fetchPostsReducer';
import checkUser from './checkUserReducer';
import fetchAllPosts from './fetchAllPostsReducer';
import fetchUserPosts from './fetchUserPostsReducer';
import followUserReducer from './followUserReducer';
import selectPostReducer from './selectPostReducer';
import songToPlayReducer from './songToPlayReducer';
import setPercentageReducer from './setPercentageReducer';
import setIsPlayingReducer from './setIsPlayingReducer';
import setVolumeReducer from './setVolumeReducer';
import setIntervalIdReducer from './setIntervalIdReducer';
import setIntervalIdFlagReducer from './setIntervalIdFlagReducer';
import setTimeReducer from './setTimeReducer';
import setMusicKitIsPlayingReducer from './setMusicKitIsPlayingReducer';

export default combineReducers({
    auth: authReducer,
    musicKit: musickitReducer,
    songs: searchSongsReducer,
    form: reduxForm,
    selectedSong: selectSongReducer,
    submitPost: submitPostReducer,
    posts: fetchPosts,
    user: checkUser,
    allPosts: fetchAllPosts,
    userPosts: fetchUserPosts,
    followUser: followUserReducer,
    selectedPost: selectPostReducer,
    songPlaying: songToPlayReducer,
    percentage: setPercentageReducer,
    isPlaying: setIsPlayingReducer,
    volume: setVolumeReducer,
    intervalId: setIntervalIdReducer,
    intervalIdFlag: setIntervalIdFlagReducer,
    time: setTimeReducer,
    musicKitIsPlaying: setMusicKitIsPlayingReducer
});