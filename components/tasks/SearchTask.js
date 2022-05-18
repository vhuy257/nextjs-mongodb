import React, { useContext, useRef } from 'react';
import { Input, InputGroup } from '@chakra-ui/react';
import { AppContext } from '../../pages';
import {
    setSearchTermAction 
} from '../../store/actions';
import {
    searchTaskService
} from '../../services/TaskService';

const SearchTask = () => {
    const ref = useRef(null);
    const { tasks, dispatch } = useContext(AppContext);

    const searchAction = async() => {
        const result = await searchTaskService(ref.current.value);
        dispatch(setSearchTermAction(result));
    }

    return (
        <InputGroup>
            <Input ref={ref} size='md' mt='5' variant='filled' placeholder='Search task' onChange={searchAction} />
        </InputGroup>
    )
}

export default SearchTask;