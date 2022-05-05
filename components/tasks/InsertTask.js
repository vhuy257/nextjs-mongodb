import React, { useRef, useContext } from 'react';
import {
    CreateTaskService,
    DeleteAllTaskService,
} from '../../services/TaskService';
import {
    createTask,
    deleteAllTaskAction
} from '../../store/actions';
import { AppContext } from '../../pages';
import styles from './task.module.css';

const InsertTask = () => {
    const inputRef = useRef(null);    
    const { dispatch } = useContext(AppContext);

    const addTask = async() => {
        var task = {
            summary: inputRef.current.value,
            dateCreated: new Date(),
            isComplete: false,
        };    
        if (inputRef.current.value === "") { return false; }
        const res = await CreateTaskService(task);
        inputRef.current.value = '';
        dispatch(createTask(res));
    }

    const deleteAllTask = async() => {
        await DeleteAllTaskService();
        dispatch(deleteAllTaskAction());
    }

    return (
        <div className="task_insert">
            <input className="task_insert__input" ref={inputRef} placeholder="Input a new task" onKeyDown={(e) => e.key === 'Enter' && addTask()}/> 
            <button onClick={addTask} className={styles.btnInsert}>Add</button>
            <button onClick={deleteAllTask} className={styles.btnDeleteAll}>Delete all tasks</button>
        </div>
    )
}

export default InsertTask;