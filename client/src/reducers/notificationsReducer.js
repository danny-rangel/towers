import { 
    FETCH_NOTIFICATIONS,
    VIEW_NOTIFICATIONS
} from "../actions/types";

export default (state = [], action) => {
    switch(action.type) {
        case FETCH_NOTIFICATIONS:
            return action.payload;
        case VIEW_NOTIFICATIONS:
            return [...state];
        default:
            return state;
    }
};