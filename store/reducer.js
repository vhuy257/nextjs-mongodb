import {
    LOAD_ALL_TASK,    
    ADD_TASK,
    DELETE_TASK,
    DELETE_ALL_TASK,
    UPDATE_TASK,
    FILTER_LIST_TASK,
    SELECTED_ITEM,
    REORDER_LIST,
    TOGGLE_TASK,
    SET_SEARCH_DATA,
    TOGGLE_TOTAL_SELECTED_ITEM
} from './actions';

export const initialState = {
    tasks: [],
    condition: 'ALL',
    selectedItemId: null,
    searchTerm: '',
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
            const result = Array.from(state.tasks);
            const [removed] = result.splice(action.payload.startIndex, 1);
            result.splice(action.payload.endIndex, 0, removed);
            
            return {
                ...state,
                tasks: result
            }
        case TOGGLE_TASK:
            const indexSelected = state.tasks.findIndex(item => item._id === action.payload._id);            
            state.tasks[indexSelected] = {...state.tasks[index], ...action.payload};
            return {
                ...state
            }
        case TOGGLE_TOTAL_SELECTED_ITEM:
            const indexItem = state.tasks.findIndex(item => item._id === action.payload.taskId); 
            state.tasks[indexItem].showTotal = action.payload.show;            
            return {...state}
        case SET_SEARCH_DATA:
            return {...state, tasks: action.payload.data}
        case DELETE_ALL_TASK:
            return {...state, tasks: []}
        default:
            return state;
    }
}

export default reducer;

