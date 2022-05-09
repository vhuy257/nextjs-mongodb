import React, { useContext } from 'react';
import { Heading, Divider, List, useDisclosure } from '@chakra-ui/react'
import ItemTask from './ItemTask';
import InsertTask from './InsertTask';
import AlertDialog from '../AlertDialog/AlertDialog';
import { AppContext } from '../../pages';
import {
    deleteTaskAction,
} from '../../store/actions';
import {
    DeleteTaskService,
} from '../../services/TaskService';

const ListTask = ({tasks, condition, selectedItemId}) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { dispatch } = useContext(AppContext);

    const deleteTask = async() => {
        await DeleteTaskService(selectedItemId);
        dispatch(deleteTaskAction(selectedItemId));
        onClose();
    }

    return (
        <>
            <Heading align="left" mb="3">
                List Task
                <InsertTask/>
            </Heading>
            <Divider mb="7"/>
            <List>
                {condition === 'ALL' && tasks.map((item, key) => (
                    <ItemTask key={key} onOpen={onOpen} item={item}/>    
                ))}
                {tasks.map((item, key) => item.isComplete === condition && (
                    <ItemTask key={key} onOpen={onOpen} item={item}/>
                ))}
            </List>
            <AlertDialog 
                onClose={onClose} 
                isOpen={isOpen} 
                onAction={deleteTask} 
                dialogBody='Are you sure you want to delete this item?' 
                dialogHeader='Delete tasks'/>
        </>
    )
}

export default ListTask;
