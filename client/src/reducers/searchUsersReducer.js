import { SEARCH_USERS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case SEARCH_USERS:
            return action.payload;
        default:
            return state;
    }
}