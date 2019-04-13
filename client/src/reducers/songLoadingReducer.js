import { SONG_LOADING } from "../actions/types";

export default function(state = false, action) {
    switch (action.type) {
        case SONG_LOADING:
            return action.payload;
        default:
            return state;
    }
}