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
import setIntervalIdFlagReducer from './setIntervalIdFlagReducer';
import setTimeReducer from './setTimeReducer';
import isMusicKitAuthorizedReducer from './isMusicKitAuthorizedReducer';
import isFetchingReducer from './isFetchingReducer';
import isFollowingReducer from './isFollowingReducer';
import haveNewNotificationsReducer from './haveNewNotificationsReducer';
import fetchUsersReducer from './fetchUsersReducer';
import postCountReducer from './postCountReducer';
import fetchedPostReducer from './fetchedPostReducer';
import songLoadingReducer from './songLoadingReducer';

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
    intervalIdFlag: setIntervalIdFlagReducer,
    time: setTimeReducer,
    authorized: isMusicKitAuthorizedReducer,
    fetching: isFetchingReducer,
    following: isFollowingReducer,
    newNotifications: haveNewNotificationsReducer,
    users: fetchUsersReducer,
    postCount: postCountReducer,
    fetchedPost: fetchedPostReducer,
    isSongLoading: songLoadingReducer
});
