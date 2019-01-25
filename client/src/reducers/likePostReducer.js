import { LIKE_POST } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case LIKE_POST:
            return action.payload;
        default:
            return state;
    }
}