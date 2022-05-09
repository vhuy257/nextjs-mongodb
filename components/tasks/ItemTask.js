import React, { useContext } from 'react';
import { Checkbox, IconButton, Text, ListItem, Box } from '@chakra-ui/react'
import { RiDeleteBin5Line } from 'react-icons/ri';
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
        <>
            <ListItem
                boxShadow='xl'
                p={[2,3]}
                borderRadius={5}
                className={`${styles.taskItem} item--${item._id}`}   
            >
                <Box className="item__left">
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
                </Box>
                <Box className="item__right">
                    <IconButton icon={<RiDeleteBin5Line />} 
                    colorScheme="red" aria-label='Delete task item' 
                    className={styles.btnDelete} onClick={(e) => {showModal(e, item._id)}}/> 
                </Box>
            </ListItem>
        </>
    )
};

export default ItemTask;