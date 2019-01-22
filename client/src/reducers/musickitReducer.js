import { FETCH_MUSIC_INSTANCE } from "../actions/types";


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_MUSIC_INSTANCE:
            return action.payload;
        default:
            return state;
    }
}