import React, { useRef, useContext } from 'react';
import {
    CreateTaskService,
    DeleteAllTaskService
} from '../../services/TaskService';
import {
    createTask,
    filterListTaskAction,
    deleteAllTaskAction
} from '../../store/actions';
import { AppContext } from '../../pages';
import { Button, Input, InputGroup, InputRightElement, Box, useDisclosure, useColorMode  } from '@chakra-ui/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClear, MdOutlineDarkMode, MdLightbulbOutline } from 'react-icons/md';
import AlertDialog from '../AlertDialog/AlertDialog';
import styles from './task.module.css';

const InsertTask = () => {
    const inputRef = useRef(null);    
    const { colorMode, toggleColorMode } = useColorMode()
    const { dispatch } = useContext(AppContext);
    const { onOpen, isOpen, onClose } = useDisclosure()    

    const deleteAllTask = async() => {
        await DeleteAllTaskService();
        dispatch(deleteAllTaskAction());
        onClose();
    }

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

    const filterList = (condition) => {
        dispatch(filterListTaskAction(condition));
    }

    return (
        <>
            <Box className="task_insert" mt={5}>
                <InputGroup size='md'>
                    <Input 
                        pr='4.5rem'
                        ref={inputRef} 
                        variant="filled"
                        borderRadius='0'
                        placeholder='Input a new task' 
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}/>
                    <InputRightElement width='5.5rem'>
                        <Button h='1.75rem' size='md' 
                        leftIcon={<IoIosAddCircleOutline />} onClick={addTask} 
                        className={styles.btnInsert}>Add</Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Button 
                mt="3"
                colorScheme={'yellow'}
                onClick={toggleColorMode}>
                {colorMode === 'light' ? <MdOutlineDarkMode/> : <MdLightbulbOutline/>} Toggle {colorMode === 'light' ? 'Dark ' : 'Light '}
            </Button>
            <AlertDialog 
                onClose={onClose} 
                isOpen={isOpen} 
                onAction={deleteAllTask} 
                dialogBody='Are you sure you want to delete all items?' 
                dialogHeader='Delete all tasks'/>
        </>
    )
}

export default InsertTask;