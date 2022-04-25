import {
    LOAD_ALL_TASK
} from './actions';

export const initialState = [];

export function reducer(state, action) {
    switch  (action.type) {
        case LOAD_ALL_TASK:
            return {...action.payload};
        default:
            return null;
    }
}


