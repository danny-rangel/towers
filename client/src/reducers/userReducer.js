import { CHECK_USER, FOLLOW_USER, UPDATE_PROFILE } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case CHECK_USER:
            return action.payload;
        case FOLLOW_USER:
            return action.payload;
        case UPDATE_PROFILE:
            return action.payload;
        default:
            return state;
    }
}