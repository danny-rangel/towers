import { SET_IS_PLAYING } from "../actions/types";

export default function(state = false, action) {
    switch (action.type) {
        case SET_IS_PLAYING:
            return action.payload;
        default:
            return state;
    }
}