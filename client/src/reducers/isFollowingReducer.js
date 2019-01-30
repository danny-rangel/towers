import { IS_FOLLOWING } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case IS_FOLLOWING:
            return action.payload;
        default:
            return state;
    }
}

