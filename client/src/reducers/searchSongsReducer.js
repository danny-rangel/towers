import { SEARCH_SONGS } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case SEARCH_SONGS:
            return action.payload;
        default:
            return state;
    }
}