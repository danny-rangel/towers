import { IS_FETCHING } from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {
        case IS_FETCHING:
            return action.payload;
        default:
            return state;
    }
}
