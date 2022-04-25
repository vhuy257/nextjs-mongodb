import {
    LOAD_ALL_TASK,    
} from './actions';

export const tasks = [];

function reducer(state, action) {
    switch (action.type) {
        case LOAD_ALL_TASK:
            return [...action.payload];
        default:
            return state;
    }
}

export default reducer;

