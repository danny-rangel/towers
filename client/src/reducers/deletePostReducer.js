import { DELETE_POST } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return action.payload;
        default:
            return state;
    }
}