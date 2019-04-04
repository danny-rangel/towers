import { 
    FETCH_ALL_POSTS,
    FETCH_FOLLOWER_POSTS,
    CONTINUE_FETCH_FOLLOWER_POSTS,
    FETCH_USER_POSTS,
    SUBMIT_POST,
    DELETE_POST,
    LIKE_POST,
    CONTINUE_FETCH_USER_POSTS
} from "../actions/types";


export default (state = null, action) => {
    switch(action.type) {
        case FETCH_ALL_POSTS:
            return action.payload;
        case FETCH_FOLLOWER_POSTS:
            return action.payload;
        case CONTINUE_FETCH_FOLLOWER_POSTS:
            return [...state, ...action.payload];
        case FETCH_USER_POSTS:
            return action.payload;
        case CONTINUE_FETCH_USER_POSTS:
            return [...state, ...action.payload];
        case SUBMIT_POST:
            return state;
        case DELETE_POST:
            return state;
        case LIKE_POST:
            return state.map(post => post._id === action.payload._id ? action.payload : post);
        default:
            return state;
    }
};