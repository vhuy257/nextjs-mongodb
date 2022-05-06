import React, { useContext } from 'react';
import {
    deleteAllTaskAction,
} from '../../store/actions';
import { AppContext } from '../../pages';
import {
    DeleteAllTaskService,
} from '../../services/TaskService';
import styles from './task.module.css';
import { motion } from "framer-motion";
import AlertDialog from '../AlertDialog/AlertDialog';
import { Button, Heading, useDisclosure } from '@chakra-ui/react'
import { MdClear } from 'react-icons/md';
import ItemTask from './ItemTask';

const ListTask = ({tasks}) => {
    const { dispatch } = useContext(AppContext);
    const { onOpen, isOpen, onClose } = useDisclosure()    

    const deleteAllTask = async() => {
        await DeleteAllTaskService();
        dispatch(deleteAllTaskAction());
        onClose();
    }

    return (
        <>
            <Heading
                m={[2, 3]}>
                List Task
            </Heading>
            <Button 
                m={[2, 3]}
                leftIcon={<MdClear />}
                onClick={onOpen} 
                className={styles.btnDeleteAll}>
                Delete all tasks
            </Button>
            <motion.ul>
                {tasks.map((item, key) => (
                    <ItemTask key={key} onOpen={onOpen} item={item}/>
                ))}
            </motion.ul>
            <AlertDialog 
                onClose={onClose} 
                isOpen={isOpen} 
                onAction={deleteAllTask} 
                dialogBody='Are you sure you want to delete all items?' 
                dialogHeader='Delete all tasks'/>
        </>
    )
}

export default ListTask;
