import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import postsReducer from './postsReducer';
import notificationsReducer from './notificationsReducer';
import authReducer from './authReducer';
import musickitReducer from './musickitReducer';
import searchSongsReducer from './searchSongsReducer';
import selectSongReducer from './selectSongReducer';
import userReducer from './userReducer';
import selectPostReducer from './selectPostReducer';
import songToPlayReducer from './songToPlayReducer';
import setPercentageReducer from './setPercentageReducer';
import setIsPlayingReducer from './setIsPlayingReducer';
import setVolumeReducer from './setVolumeReducer';
import setIntervalIdReducer from './setIntervalIdReducer';
import setIntervalIdFlagReducer from './setIntervalIdFlagReducer';
import setTimeReducer from './setTimeReducer';
import setMusicKitIsPlayingReducer from './setMusicKitIsPlayingReducer';
import isMusicKitAuthorizedReducer from './isMusicKitAuthorizedReducer';
import isFetchingReducer from './isFetchingReducer';
import showSidebarReducer from './showSidebarReducer';
import isFollowingReducer from './isFollowingReducer';

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    musicKit: musickitReducer,
    songs: searchSongsReducer,
    form: reduxForm,
    selectedSong: selectSongReducer,
    user: userReducer,
    selectedPost: selectPostReducer,
    songPlaying: songToPlayReducer,
    percentage: setPercentageReducer,
    isPlaying: setIsPlayingReducer,
    volume: setVolumeReducer,
    intervalId: setIntervalIdReducer,
    intervalIdFlag: setIntervalIdFlagReducer,
    time: setTimeReducer,
    musicKitIsPlaying: setMusicKitIsPlayingReducer,
    authorized: isMusicKitAuthorizedReducer,
    fetching: isFetchingReducer,
    sidebar: showSidebarReducer,
    following: isFollowingReducer
});