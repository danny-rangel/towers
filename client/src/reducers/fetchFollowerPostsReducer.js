import { FETCH_FOLLOWER_POSTS } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_FOLLOWER_POSTS:
            return action.payload;
        default:
            return state;
    }
}