import { IS_MUSIC_KIT_AUTHORIZED } from "../actions/types";


export default function(state = null, action) {
    switch (action.type) {
        case IS_MUSIC_KIT_AUTHORIZED:
            return action.payload || false;
        default:
            return state;
    }
}