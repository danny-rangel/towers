import { CHECK_USER, FOLLOW_USER } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case CHECK_USER:
            return action.payload;
        case FOLLOW_USER:
            return {...action.payload};
        default:
            return state;
    }
}