import React, { useRef } from 'react';
import axios from 'axios';

const InsertTask = () => {
    const inputRef = useRef(null);

    const addTask = async() => {
        var task = {
            summary: inputRef.current.value,
            dateCreated: new Date(),
            isComplete: false,
        };        
        const res = await axios.post('/api/tasks/create', task);
        inputRef.current.value = '';
        const newTask = { 
            _id: res.data.insertedId, 
            ...task 
        };
        //setListTasks([...listTasks, newTask]);
    }

    return (
        <div className="task_insert">
            <input className="task_insert__input" ref={inputRef} placeholder="Input a new task" onKeyDown={(e) => e.key === 'Enter' && addTask()}/> 
            <button onClick={addTask}>Add</button>
        </div>
    )
}

export default InsertTask;