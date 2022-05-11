import {
    LOAD_ALL_TASK,    
    ADD_TASK,
    DELETE_TASK,
    DELETE_ALL_TASK,
    UPDATE_TASK,
    FILTER_LIST_TASK,
    SELECTED_ITEM,
    REORDER_LIST
} from './actions';

export const initialState = {
    tasks: [],
    condition: 'ALL',
    selectedItemId: null
};

function reducer(state, action) {
    switch (action.type) {
        case LOAD_ALL_TASK:
            return {
                ...state,
                tasks: [...action.payload]
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case SELECTED_ITEM: 
            return {
                ...state,
                selectedItemId: action.payload,
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(item => item._id !== action.payload),
            };
        case UPDATE_TASK:
            const index = state.tasks.findIndex(item => item._id === action.payload._id);            
            state.tasks[index] = {...state.tasks[index], ...action.payload};
            return {...state};
        case FILTER_LIST_TASK: 
            return {
                ...state, 
                condition: action.payload
            }
        case REORDER_LIST:
            return {
                ...state,
                tasks: state.tasks.sort((a, b) => {return a.sortIndex - b.sortIndex})
            }
        case DELETE_ALL_TASK:
            return {...state, tasks: []}
        default:
            return state;
    }
}

export default reducer;

