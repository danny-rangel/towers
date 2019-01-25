import { 
    FETCH_ALL_POSTS,
    FETCH_FOLLOWER_POSTS,
    FETCH_POSTS,
    FETCH_POST,
    FETCH_USER_POSTS,
    SUBMIT_POST,
    DELETE_POST,
    LIKE_POST
} from "../actions/types";

export default (state = [], action) => {
    switch(action.type) {
        case FETCH_ALL_POSTS:
            return action.payload;
        case FETCH_FOLLOWER_POSTS:
            return action.payload;
        case FETCH_POSTS:
            return action.payload;
        case FETCH_POST:
            return [action.payload];
        case FETCH_USER_POSTS:
            return action.payload;
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