import React, { useContext } from 'react';
import { Flex, Box, Icon, useDisclosure, Heading, Text } from '@chakra-ui/react'
import ListTask from './ListTask';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
    updateTaskAction,
    setTaskIdAction,
    deleteTaskAction,
    redorderListAction,
} from '../../store/actions';
import {
    UpdateTaskStatusService,
    DeleteTaskService,
    UpdateSortOrderService
} from '../../services/TaskService';
import { AiOutlineFileDone } from 'react-icons/ai';
import { VscTrash } from 'react-icons/vsc';
import { RiFileList3Line } from 'react-icons/ri';
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

    const reOrderList = async(result) => {
        if(result.source.index === result.destination.index) {
            return
        }
        const list = Array.from(tasks);
        const [removed] = list.splice(result.source.index, 1);
        list.splice(result.destination.index, 0, removed);
        list.map((item, key) => {item.sortIndex = key})
        const sortObject = {arrayList: list}
        await UpdateSortOrderService(sortObject);
        dispatch(redorderListAction({startIndex: result.source.index, endIndex: result.destination.index}));
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        
        if (result.source.droppableId === result.destination.droppableId) {
            reOrderList(result);
        }
        
        console.log(result);

        if(result.destination.droppableId !== result.source.droppableId) {
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
                                <Box bg="gray.100">
                                    <Flex bg="gray.300" textAlign={'left'} p={4} alignItems='center' alignSelf={'center'}>
                                        <Icon w={6} h={6} color="gray.500" as={RiFileList3Line} mr="2"/> <Text color="gray.600" alignItems={'center'}>Process</Text>
                                    </Flex>
                                    <Box p={4}>
                                        <ListTask tasks={tasks} conditionFilter={false} selectedItemId={selectedItemId} />
                                    </Box>
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
                                <Box mt="0" mx="5" bg="green.300">
                                    <Flex bg="green.500" textAlign={'left'} p={4} alignItems='center' alignSelf={'center'}>
                                        <Icon w={7} h={7} color="green.200" as={AiOutlineFileDone} mr="2"/> <Text color="green.200" alignItems={'center'}>Done</Text>
                                    </Flex>
                                    <Box p={4}>
                                        <ListTask  tasks={tasks} conditionFilter={true} selectedItemId={selectedItemId} />
                                    </Box>
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
                                <Flex mt="0" bg="red.600" padding="5" h="400px" flex='1' align={'center'} justify='center'>
                                    <Icon color="red.200" w={6} h={6} as={VscTrash} mr="2" /> <Text color="red.200" fontSize={'sm'} alignItems={'center'}>Drop task here to delete</Text>
                                </Flex>
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