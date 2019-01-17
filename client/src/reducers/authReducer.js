import { FETCH_USER } from "../actions/types";

// state is null at first since we dont know if user is logged in
// if logged in, we return the user model
// if not logged in, payload is empty string so we return false since empty string
// is treated as false
export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}