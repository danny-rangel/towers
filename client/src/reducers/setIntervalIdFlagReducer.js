import { SET_INTERVAL_ID_FLAG } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case SET_INTERVAL_ID_FLAG:
            return action.payload;
        default:
            return state;
    }
}