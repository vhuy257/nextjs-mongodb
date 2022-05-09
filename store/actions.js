export const LOAD_ALL_TASK = "LOAD_ALL_TASK";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_ALL_TASK = "DELETE_ALL_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const FILTER_LIST_TASK = "FILTER_LIST_TASK";
export const SELECTED_ITEM = "SELECTED_ITEM";

export const getAllTasks = (data) => {
    return {
        type: LOAD_ALL_TASK,
        payload: data
    };
}

export const createTask = (data) => {
    return {
        type: ADD_TASK,
        payload: data
    }
}

export const deleteTaskAction = (data) => {
    return {
        type: DELETE_TASK,
        payload: data
    }
}

export const deleteAllTaskAction = () => {
    return {
        type: DELETE_ALL_TASK
    }
}

export const updateTaskAction = (task) => {
    return {
        type: UPDATE_TASK,
        payload: task
    }
}

export const filterListTaskAction = (condition) => {
    return {
        type: FILTER_LIST_TASK,
        payload: condition
    }
}

export const setTaskIdAction = (taskId) => {
    return {
        type: SELECTED_ITEM,
        payload: taskId
    }
}