import postsReducer from '../postsReducer';
import { 
    FETCH_ALL_POSTS,
    FETCH_FOLLOWER_POSTS,
    CONTINUE_FETCH_FOLLOWER_POSTS,
    FETCH_USER_POSTS,
    SUBMIT_POST,
    DELETE_POST,
    LIKE_POST,
    CONTINUE_FETCH_USER_POSTS,
    CLEAR_POSTS_STATE 
} from '../../actions/types';

it('handles actions of type FETCH_ALL_POSTS', () => {
    const action = {
        type: FETCH_ALL_POSTS,
        payload: []
    };

    const newState = postsReducer(null, action);

    expect(newState).toEqual([]);
});

it('handles actions of type FETCH_FOLLOWER_POSTS', () => {
    const action = {
        type: FETCH_FOLLOWER_POSTS,
        payload: []
    };

    const newState = postsReducer(null, action);

    expect(newState).toEqual([]);
});

it('handles actions of type FETCH_USER_POSTS', () => {
    const action = {
        type: FETCH_USER_POSTS,
        payload: []
    };

    const newState = postsReducer(null, action);

    expect(newState).toEqual([]);
});

it('handles actions of type CLEAR_POSTS_STATE', () => {
    const action = {
        type: CLEAR_POSTS_STATE,
        payload: null
    };

    const newState = postsReducer(null, action);

    expect(newState).toEqual(null);
});

