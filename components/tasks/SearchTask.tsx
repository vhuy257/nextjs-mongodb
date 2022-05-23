import React, { useContext, useRef } from 'react';
import { Input, InputGroup, InputLeftElement, Box, Text} from '@chakra-ui/react';
import { AppContext } from '../../pages';
import {
    setSearchDataAction 
} from '../../store/actions';
import {
    searchTaskService
} from '../../services/TaskService';
import {
    RiSearch2Line
} from 'react-icons/ri';

const SearchTasks = () => {
    const inputRef = useRef(null);
    const {dispatch}: any= useContext(AppContext);
    
    const searchTask = async() => {
        const data = await searchTaskService(inputRef.current.value);
        dispatch(setSearchDataAction(data));
    }

    return (
        <>
        <Box mt={5} size="md" w="30%">
            <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                children={<RiSearch2Line/>}/>
                <Input ref={inputRef} borderRadius={0} size='md' bg="whiteAlpha.500" variant='filled' onChange={searchTask} placeholder='Search task'/>
            </InputGroup>
            <Text align={'left'} mt='5'>Your search keywords: {inputRef.current && inputRef.current.value}</Text>
        </Box>
        </>
    )
}

export default SearchTasks;