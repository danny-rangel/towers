import postsReducer from '../postsReducer';
import { FETCH_ALL_POSTS } from '../../actions/types';

it('handles actions of type FETCH_ALL_POSTS', () => {
    const action = {
        type: FETCH_ALL_POSTS,
        payload: []
    };

    const newState = postsReducer(null, action);

    expect(newState).toEqual([]);
});

