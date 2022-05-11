import React, { useContext } from 'react';
import { Flex, Box, Icon, useDisclosure } from '@chakra-ui/react'
import ListTask from './ListTask';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
    updateTaskAction,
    setTaskIdAction,
    deleteTaskAction
} from '../../store/actions';
import {
    UpdateTaskStatusService,
    DeleteTaskService
} from '../../services/TaskService';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BsTrash, BsCardList } from 'react-icons/bs';
import { AppContext } from '../../pages';
import AlertDialog from '../AlertDialog/AlertDialog';

const getListStyle = isDraggingOver => ({
    width: '100%'
});

const TaskDragDrop = ({tasks, selectedItemId}) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { dispatch } = useContext(AppContext);
    
    const updateStatus = async(taskId, checked) => {
        const task = {_id: taskId, isComplete: checked}
        await UpdateTaskStatusService(taskId, checked);
        dispatch(updateTaskAction(task))
    }
    
    const showModal = (taskId) => {
        onOpen();
        dispatch(setTaskIdAction(taskId))
    }

    const deleteTask = async() => {
        await DeleteTaskService(selectedItemId);
        dispatch(deleteTaskAction(selectedItemId));
        onClose();
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
  
        if(result.destination) {
            switch(result.destination.droppableId) {
                case 'droppable-1':
                    updateStatus(result.draggableId, true);
                    break;
                case 'droppable-0':
                    updateStatus(result.draggableId, false);
                    break;
                case 'droppable-2':
                    showModal(result.draggableId);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <>
        <DragDropContext onDragEnd={onDragEnd}>
                    <Flex mt="5" align="flex-start" justify="stretch">
                        <Droppable droppableId="droppable-0">   
                            {(provided, snapshot) => (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                > 
                                <Box bg="gray.100" padding="5">
                                    <Icon w={8} h={8} color="gray.500" as={BsCardList} mb="5"/>
                                    <ListTask  tasks={tasks} conditionFilter={false} selectedItemId={selectedItemId} />
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
                                <Box mt="0" mx="5" bg="green.300" padding="5">
                                    <Icon w={8} h={8} color="green" as={AiOutlineFileDone} mb="5"/>
                                    <ListTask  tasks={tasks} conditionFilter={true} selectedItemId={selectedItemId} />
                                </Box>
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
                                <Box mt="0" bg="red.100" padding="5">
                                    <Icon color="red.400" w={8} h={8} as={BsTrash} mb="5" /> 
                                </Box>
                                {provided.placeholder}
                                </div>
                        )}
                        </Droppable>
                    </Flex>
        </DragDropContext>
        <AlertDialog 
        onClose={onClose} 
        isOpen={isOpen} 
        onAction={deleteTask} 
        dialogBody='Are you sure you want to delete this item?' 
        dialogHeader='Delete tasks'/>
        </>
    )
}

export default TaskDragDrop;