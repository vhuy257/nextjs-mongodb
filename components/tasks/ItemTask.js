import React, { useContext } from 'react';
import { Checkbox, IconButton, Text } from '@chakra-ui/react'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { motion } from "framer-motion";
import { AppContext } from '../../pages';
import styles from './task.module.css';
import Moment from 'react-moment';
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
            drag
            whileDrag={{ scale: 0.8 }}
            dragConstraints={{ left: 0, right: 0 }}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            dragSnapToOrigin={true}
            className={`${styles.taskItem} item--${item._id}`}   
            custom={item}
            variants={variants} 
        >
            <motion.div className="item__left">
                <Checkbox size='lg' colorScheme='green' name={`checkbox__${item._id}`} id={`checkbox__${item._id}`}  
                defaultIsChecked={false} isChecked={item.isComplete} onChange={(e) => {updateStatus(e, item._id)}}>
                    <Text align='left' ml="3" className={`${item.isComplete ? styles.isComplete : ''} form-control`} htmlFor={`checkbox__${item._id}`}>    
                        {item.summary}
                    </Text>
                    <Text fontSize='xs' ml="3" color='gray' align='left' isTruncated>
                        <Moment format="D MMM YYYY">
                            {item.dateCreated}
                        </Moment>
                    </Text>
                </Checkbox>
            </motion.div>
            <motion.div className="item__right">
                <IconButton icon={<RiDeleteBin5Line />} 
                colorScheme="red" aria-label='Delete task item' 
                className={styles.btnDelete} onClick={() => {deleteTask(item._id)}}/> 
            </motion.div>
        </motion.li>
    )
};

export default ItemTask;