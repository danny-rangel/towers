import { FOLLOW_USER } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case FOLLOW_USER:
            return action.payload;
        default:
            return state;
    }
}