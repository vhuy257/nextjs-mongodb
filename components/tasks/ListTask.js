import React, { useContext } from 'react';
import Head from 'next/head';
import {
    deleteTaskAction,
    deleteAllTaskAction,
    updateTaskAction,
} from '../../store/actions';
import { AppContext } from '../../pages';
import {
    DeleteTaskService,
    DeleteAllTaskService,
    UpdateTaskStatusService 
} from '../../services/TaskService';
const ListTask = ({tasks}) => {
    const { dispatch } = useContext(AppContext);
    
    const deleteTask = async(taskId) => {
        await DeleteTaskService(taskId);
        dispatch(deleteTaskAction(taskId));
    }

    const deleteAllTask = async() => {
        await DeleteAllTaskService();
        dispatch(deleteAllTaskAction());
    }

    const updateStatus = async(e, taskId) => {
        const task = {_id: taskId, isComplete: e.target.checked}
        await UpdateTaskStatusService(taskId, e.target.checked);
        dispatch(updateTaskAction(task))
    }

    return (
        <>
            <Head>
                <title>List tasks item</title>
            </Head>
            <button onClick={deleteAllTask}>Delete all tasks</button>
            <h1>List Task</h1>
            <ul>
                {   
                    tasks.map((item, key) => (
                        <li className={`item--${item._id}`} key={key}> 
                            <input type="checkbox" checked={item.isComplete} onChange={(e) => {updateStatus(e, item._id)}}/>
                            {item.summary} 
                            <button onClick={() => {deleteTask(item._id)}}>Delete</button>
                        </li> 
                    ))
                }
            </ul>
        </>
    )
}

export default ListTask;
