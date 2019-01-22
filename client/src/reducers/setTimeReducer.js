import { SET_TIME } from "../actions/types";

export default function(state = "0:00", action) {
    switch (action.type) {
        case SET_TIME:
            return action.payload;
        default:
            return state;
    }
}