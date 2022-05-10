import React, { useContext } from 'react';
import { Checkbox, IconButton, Text, ListItem, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import { AppContext } from '../../pages';
import styles from './task.module.css';
import Moment from 'react-moment';
import {
    updateTaskAction,
    setTaskIdAction
} from '../../store/actions';
import {
    UpdateTaskStatusService 
} from '../../services/TaskService';

const ItemTask = ({item, onOpen}) => {
    const { dispatch } = useContext(AppContext);
    
    const updateStatus = async(e, taskId) => {
        const task = {_id: taskId, isComplete: e.target.checked}
        await UpdateTaskStatusService(taskId, e.target.checked);
        dispatch(updateTaskAction(task))
    }
    
    const showModal = (e, taskId) => {
        onOpen();
        dispatch(setTaskIdAction(taskId))
    }

    return ( 
        <ListItem
            boxShadow='base'
            bg="white"
            p={[2,3]}
            borderRadius={5}
            className={`${styles.taskItem} item--${item._id}`}>
            <Box className="item__left">
                    <Text fontSize='sm' color='black' align='left' ml="3" htmlFor={`checkbox__${item._id}`}>    
                        {item.summary}
                    </Text>
                    <Text fontSize='xs' ml="3" color='gray' align='left' isTruncated>
                        <Moment format="D MMM YYYY">
                            {item.dateCreated}
                        </Moment>
                    </Text>
            </Box>
        </ListItem>
    )
};

export default ItemTask;