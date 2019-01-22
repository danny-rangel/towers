import { SET_VOLUME } from "../actions/types";

export default function(state = 1, action) {
    switch (action.type) {
        case SET_VOLUME:
            return action.payload;
        default:
            return state;
    }
}