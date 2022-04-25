import React, { useEffect, useState, useReducer } from 'react';
import Head from 'next/head';
import axios from 'axios';
import {reducer, initState} from '../../store/reducer';
import {
    setListTasks
} from '../../store/actions';

const ListTask = () => {
    const [listTasks, setListTasks] = useState([]);
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(async () => {
        const res = await axios.get('/api/tasks/get-all');
        dispatch(setListTasks(res.data));
    }, [])

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
            <button onClick={deleteAllTask}>Delete all tasks</button>
            <h1>List Task</h1>
            <ul>
                {
                    listTasks.map((item, key) => (
                        <li className={`item--${item._id}`} key={key}>{item.summary} <button onClick={() => {deleteTask(item._id)}}>Delete</button></li> 
                    ))
                }
            </ul>
        </>
    )
}

export default ListTask;
