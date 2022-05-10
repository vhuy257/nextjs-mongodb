import React, { useContext } from 'react';
import { Flex, Box, Square, Icon, Text } from '@chakra-ui/react'
import ListTask from './ListTask';
import { BsPatchCheck, BsTrash } from 'react-icons/bs';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
    updateTaskAction,
    setTaskIdAction
} from '../../store/actions';
import {
    UpdateTaskStatusService 
} from '../../services/TaskService';
import { AppContext } from '../../pages';

const getListStyle = isDraggingOver => ({
    width: '100%'
});

const TaskDragDrop = ({tasks, condition, selectedItemId}) => {
    const { dispatch } = useContext(AppContext);
    
    const updateStatus = async(taskId) => {
        const task = {_id: taskId, isComplete: true}
        await UpdateTaskStatusService(taskId, true);
        dispatch(updateTaskAction(task))
    }
    
    const showModal = (e, taskId) => {
        onOpen();
        dispatch(setTaskIdAction(taskId))
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        if(result.destination.droppableId === 'droppable-1') {
            updateStatus(result.draggableId)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
                    <Flex mt="5">
                        <Droppable droppableId="droppable-0">   
                            {(provided, snapshot) => (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                > 
                                <Box bg="gray.100" borderRadius={5} padding="10" flex='1'>
                                    <ListTask  tasks={tasks} condition={condition} selectedItemId={selectedItemId} />
                                </Box>
                                {provided.placeholder}
                                </div>
                        )}
                        </Droppable>
                        <Droppable droppableId="droppable-1">   
                            {(provided, snapshot) => (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                > 
                                <Square mt="0" mx="5" bg="green.100" borderRadius={5} padding="10" flex='1'>
                                    <Icon color="black" as={BsPatchCheck} mr="3" /> <Text color="black"> Task done </Text>
                                </Square>
                                {provided.placeholder}
                                </div>
                        )}
                        </Droppable>
                        <Droppable droppableId="droppable-2">   
                            {(provided, snapshot) => (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                > 
                                <Square bg="red.100" borderRadius={5} padding="10" flex='1'>
                                    <Icon color="black" as={BsTrash} mr="3" /> <Text color="black"> Delete task </Text>
                                </Square>
                                {provided.placeholder}
                                </div>
                        )}
                        </Droppable>
                    </Flex>
        </DragDropContext>
    )
}

export default TaskDragDrop;