import { SELECT_SONG } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case SELECT_SONG:
            return action.payload;
        default:
            return state;
    }
}