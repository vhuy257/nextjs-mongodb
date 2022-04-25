export const LOAD_ALL_TASK = "LOAD_ALL_TASK";

export const getAllTasks = (data) => {
    return {
        type: LOAD_ALL_TASK,
        payload: data
    };
}
