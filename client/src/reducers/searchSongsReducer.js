import { SEARCH_SONGS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case SEARCH_SONGS:
            return action.payload;
        default:
            return state;
    }
}