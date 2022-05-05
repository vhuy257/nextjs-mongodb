import React, { useContext } from 'react';
import {
    deleteTaskAction,
    deleteAllTaskAction,
    updateTaskAction,
} from '../../store/actions';
import { AppContext } from '../../pages';
import {
    DeleteTaskService,
    UpdateTaskStatusService 
} from '../../services/TaskService';
import styles from './task.module.css';

const ListTask = ({tasks}) => {
    const { dispatch } = useContext(AppContext);
    
    const deleteTask = async(taskId) => {
        await DeleteTaskService(taskId);
        dispatch(deleteTaskAction(taskId));
    }

    const updateStatus = async(e, taskId) => {
        const task = {_id: taskId, isComplete: e.target.checked}
        await UpdateTaskStatusService(taskId, e.target.checked);
        dispatch(updateTaskAction(task))
    }

    return (
        <>
            <h1>List Task</h1>
            <ul>
                {   
                    tasks.map((item, key) => (
                        <li className={`${styles.taskList} item--${item._id}`} key={key}> 
                            <label className="form-control" id={`checkbox__${item._id}`} htmlFor={`checkbox__${item._id}`}>
                                <input type="checkbox" name={`checkbox__${item._id}`} checked={item.isComplete} onChange={(e) => {updateStatus(e, item._id)}}/>
                                {item.summary}
                            </label>
                            <button className={styles.btnDelete} onClick={() => {deleteTask(item._id)}}>Delete</button>
                        </li> 
                    ))
                }
            </ul>
        </>
    )
}

export default ListTask;
