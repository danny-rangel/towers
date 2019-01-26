import { SELECT_SONG } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SELECT_SONG:
            return action.payload;
        default:
            return state;
    }
}