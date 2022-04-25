import { React, useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Layout from '../components/layout'

const ListTask = () => {
    const [listTasks, setListTasks] = useState([]);
    const inputRef = useRef(null);

    useEffect(async () => {
        const res = await axios.get('/api/tasks/get-all');
        setListTasks(res.data);
    }, [])

    const addTask = async() => {
        var task = {
            summary: inputRef.current.value,
            dateCreated: new Date(),
            isComplete: false,
        };        
        const res = await axios.post('/api/tasks/create', task);
        const newTask = { 
            _id: res.data.insertedId, 
            ...task 
        }; inputRef.current.value = '';
        setListTasks([...listTasks, newTask]);
    }

    const deleteTask = async(taskId) => {
        await axios.post(`/api/tasks/${taskId}`);
        const filterList = listTasks.filter((item) => item._id !== taskId);
        setListTasks(filterList);
    }

    const deleteAllTask = async() => {
        await axios.get('/api/tasks/delete-all');
        setListTasks([]);
    }

    return (
        <>
            <Head>
                <title>List tasks item</title>
            </Head>
            <input type="text" placeholder="Type a task" ref={inputRef} onKeyDown={(e) => e.key === 'Enter' && addTask()}/>
            <button onClick={addTask}>Click</button>
            <button onClick={deleteAllTask}>Delete all tasks</button>
            <Layout>
                <h1>List Task</h1>
                <ul>
                    {
                        listTasks.map((item, key) => (
                            <li className={`item--${item._id}`} key={key}>{item.summary} <button onClick={() => {deleteTask(item._id)}}>Delete</button></li> 
                        ))
                    }
                </ul>
            </Layout>
        </>
    )
}

export default ListTask;
