import React, { useContext } from 'react';
import { Checkbox, IconButton, Text } from '@chakra-ui/react'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { motion } from "framer-motion";
import { AppContext } from '../../pages';
import styles from './task.module.css';
import {
    updateTaskAction,
    deleteTaskAction,
} from '../../store/actions';
import {
    DeleteTaskService,
    UpdateTaskStatusService 
} from '../../services/TaskService';

const variants = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
      },
    }),
    hidden: { opacity: 0 },
}

const ItemTask = ({item}) => {
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
        <motion.li 
            className={`${styles.taskItem} ${item.isComplete ? styles.isComplete : ''} item--${item._id}`}   
            custom={item}
            animate="visible"
            variants={variants}
        >
            <motion.div layout className="item__left">
                <Checkbox size='lg' colorScheme='green' name={`checkbox__${item._id}`} id={`checkbox__${item._id}`}  
                defaultChecked={item.isComplete} onChange={(e) => {updateStatus(e, item._id)}}>
                <Text className="form-control" htmlFor={`checkbox__${item._id}`}>    
                    {item.summary}
                </Text>
                </Checkbox>
            </motion.div>
            <IconButton icon={<RiDeleteBin5Line />} 
            colorScheme="red" aria-label='Delete task item' 
            className={styles.btnDelete} onClick={() => {deleteTask(item._id)}}/> 
        </motion.li>
    )
};

export default ItemTask;