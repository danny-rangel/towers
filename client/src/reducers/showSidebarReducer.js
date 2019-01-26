import { SHOW_SIDEBAR } from "../actions/types";

export default function(state = false, action) {
    switch (action.type) {
        case SHOW_SIDEBAR:
            return action.payload;
        default:
            return state;
    }
}

