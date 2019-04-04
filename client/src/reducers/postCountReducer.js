import { 
    FETCH_ALL_FOLLOWER_POSTS_COUNT, FETCH_ALL_USER_POSTS_COUNT
} from "../actions/types";


export default (state = 0, action) => {
    switch(action.type) {
        case FETCH_ALL_FOLLOWER_POSTS_COUNT:
            return {...state, ...action.payload.postsCount};
        case FETCH_ALL_USER_POSTS_COUNT:
            return action.payload.postsCount;
        default:
            return state;
    }
};