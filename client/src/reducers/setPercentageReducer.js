import { SET_PERCENTAGE } from "../actions/types";

export default function(state = 0, action) {
    switch (action.type) {
        case SET_PERCENTAGE:
            return action.payload;
        default:
            return state;
    }
}