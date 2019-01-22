import { SUBMIT_POST } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case SUBMIT_POST:
            return action.payload;
        default:
            return state;
    }
}