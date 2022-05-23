import {Task} from '../model/task';

export const LOAD_ALL_TASK = "LOAD_ALL_TASK";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_ALL_TASK = "DELETE_ALL_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const FILTER_LIST_TASK = "FILTER_LIST_TASK";
export const SELECTED_ITEM = "SELECTED_ITEM";
export const REORDER_LIST = "REORDER_LIST";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const SET_SEARCH_DATA = "SET_SEARCH_DATA";

export interface GetTodoAction {
    type: typeof LOAD_ALL_TASK,
    payload: Array<Task>
}

export const getAllTasks = (data):GetTodoAction => {
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

export const redorderListAction = (sortObj) => {
    return {
        type: REORDER_LIST,
        payload: sortObj
    }
}

export const selectMultiTaskAction = (taskId) => {
    return {
        type: TOGGLE_TASK,
        payload: taskId
    }
}

export const setSearchDataAction = (data) => {
    return {
        type: SET_SEARCH_DATA,
        payload: data
    }
}

export type AppActions =
  GetTodoAction;
  