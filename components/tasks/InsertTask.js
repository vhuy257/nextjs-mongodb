import React, { useRef, useContext } from 'react';
import {
    CreateTaskService,
} from '../../services/TaskService';
import {
    createTask,
} from '../../store/actions';
import { AppContext } from '../../pages';
import { Button, Input, InputGroup, InputRightElement, Box  } from '@chakra-ui/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './task.module.css';

const InsertTask = () => {
    const inputRef = useRef(null);    
    const { dispatch } = useContext(AppContext);

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

    return (
        <Box className="task_insert" mt={5}>
            <InputGroup size='md'>
                <Input 
                    pr='4.5rem'
                    ref={inputRef} 
                    placeholder='Input a new task' 
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}/>
                <InputRightElement width='5.5rem'>
                    <Button h='1.75rem' size='md' 
                    leftIcon={<IoIosAddCircleOutline />} onClick={addTask} 
                    className={styles.btnInsert}>Add</Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}

export default InsertTask;