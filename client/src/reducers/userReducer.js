import { CHECK_USER, FOLLOW_USER, CLEAR_USER_STATE } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case CHECK_USER:
            return action.payload;
        case FOLLOW_USER:
            return {...action.payload};
        case CLEAR_USER_STATE:
            return null;
        default:
            return state;
    }
}