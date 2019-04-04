import { FETCH_USER, UPDATE_PROFILE, UPDATE_AVI } from "../actions/types";

// state is null at first since we dont know if user is logged in
// if logged in, we return the user model
// if not logged in, payload is empty string so we return false since empty string
// is treated as false
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case UPDATE_PROFILE:
            return {...action.payload};
        case UPDATE_AVI:
            return {...action.payload};
        default:
            return state;
    }
}

