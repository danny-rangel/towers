import { FETCH_SINGLE_POST } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_POST:
            return action.payload;
        default:
            return state;
    }
}