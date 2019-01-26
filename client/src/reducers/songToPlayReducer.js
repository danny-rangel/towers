import { SONG_TO_PLAY } from "../actions/types";

export default function(state = { name: '' }, action) {
    switch (action.type) {
        case SONG_TO_PLAY:
            return action.payload;
        default:
            return state;
    }
}