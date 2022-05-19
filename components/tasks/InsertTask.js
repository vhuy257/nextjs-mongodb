import React, { useRef, useContext } from 'react';
import {
    CreateTaskService,
    DeleteAllTaskService
} from '../../services/TaskService';
import {
    createTask,
    deleteAllTaskAction
} from '../../store/actions';
import { Button, Input, InputGroup, InputRightElement, Box, useDisclosure, useColorMode, Stack  } from '@chakra-ui/react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDarkMode, MdLightbulbOutline, MdClear } from 'react-icons/md';
import AlertDialog from '../AlertDialog/AlertDialog';
import { AppContext } from '../../pages';
import styles from './task.module.css';

const InsertTask = () => {
    const { tasks,dispatch } = useContext(AppContext);
    const { colorMode, toggleColorMode } = useColorMode()    
    const { onOpen, isOpen, onClose } = useDisclosure()    
    const inputRef = useRef(null);    

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
            selected: false,
            sortIndex: [...tasks].length,
        };    
        if (inputRef.current.value === "") { return false; }
        const res = await CreateTaskService(task);
        inputRef.current.value = '';
        dispatch(createTask(res));
    }

    return (
        <>
            <Box className="task_insert" mt={5}>
                <InputGroup size='md'>
                    <Input 
                        pr='4.5rem'
                        ref={inputRef} 
                        variant="filled"
                        bg="whiteAlpha.500"
                        borderRadius='0'
                        placeholder='Input a new task' 
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}/>
                    <InputRightElement width='5.5rem'>
                        <Button h='1.75rem' size='md' 
                        borderRadius={0}
                        bg="whiteAlpha.800"
                        color="blackAlpha.800"
                        leftIcon={<IoIosAddCircleOutline />} onClick={addTask} 
                        className={styles.btnInsert}>Add</Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Stack direction='row' spacing={4} align='right' mt="5" justify='flex-end'>
                <Button 
                    colorScheme={'red'}
                    variant='outline'
                    size='md'
                    leftIcon={<MdClear/>}
                    onClick={onOpen}>
                    Delete All Item
                </Button>
                <Button 
                    colorScheme={'yellow'}
                    variant='filled'
                    leftIcon={colorMode === 'light' ? <MdOutlineDarkMode/> : <MdLightbulbOutline/>}
                    onClick={toggleColorMode}>
                    Toggle {colorMode === 'light' ? 'Dark ' : 'Light '}
                </Button>
            </Stack>
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