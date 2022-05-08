import axios from 'axios';

export const LoadAllTasksService = async() => {
    const data = await axios.get('/api/tasks/get-all');
    return data;
}

export const CreateTaskService = async(task) => {
    const res = await axios.post('/api/tasks/create', task);
    const newTask = { _id: res.data.insertedId, ...task };
    return newTask;
}

export const DeleteTaskService = async(taskId) => {
    return await axios.post(`/api/tasks/${taskId}`);
}

export const DeleteAllTaskService = async() => {
    return await axios.get('/api/tasks/delete-all');
}

export const UpdateTaskStatusService = async(_id, isComplete) => {
    return await axios.put('/api/tasks/update', {_id, isComplete});
}
