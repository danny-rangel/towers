import { 
    HAVE_NEW_NOTIFICATIONS
} from "../actions/types";

export default (state = null, action) => {
    switch(action.type) {
        case HAVE_NEW_NOTIFICATIONS:
            return action.payload;
        default:
            return state;
    }
};