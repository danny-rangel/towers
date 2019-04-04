import { FETCH_POST_LIKES, FETCH_FOLLOWERS, FETCH_FOLLOWING } from "../actions/types";


export default function(state = null, action) {
    switch (action.type) {
        case FETCH_POST_LIKES:
            return action.payload;
        case FETCH_FOLLOWERS:
            return action.payload;
        case FETCH_FOLLOWING:
            return action.payload;
        default:
            return state;
    }
}

