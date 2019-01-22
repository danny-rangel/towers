import { FETCH_USER_POSTS } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_USER_POSTS:
            return action.payload;
        default:
            return state;
    }
}