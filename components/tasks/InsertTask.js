import React, { useRef, useContext } from 'react';
import {
    CreateTaskService
} from '../../services/TaskService';
import {
    createTask
} from '../../store/actions';
import { AppContext } from '../../pages';

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

    return (
        <div className="task_insert">
            <input className="task_insert__input" ref={inputRef} placeholder="Input a new task" onKeyDown={(e) => e.key === 'Enter' && addTask()}/> 
            <button onClick={addTask}>Add</button>
        </div>
    )
}

export default InsertTask;