import React, { useContext } from 'react';
import { Flex, Box, Icon, useDisclosure, Circle, Text } from '@chakra-ui/react'
import ListTask from './ListTask';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
    updateTaskAction,
    setTaskIdAction,
    deleteTaskAction,
    redorderListAction,
    toggleTotalSelectedItemAction
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
    width: '100%',
    //background: isDraggingOver ? "lightblue" : "lightgrey",
});

const getListStyleDelete = isDraggingOver => ({
    transition: '.3s ease-in-out',
    //transform: isDraggingOver ? 'scale(1.2)' : "none",
});

const TaskDragDrop = ({tasks, selectedItemId}) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { dispatch } = useContext(AppContext);
    
    const updateStatus = async(taskId, checked) => {
        const task = {_id: taskId, isComplete: checked}
        await UpdateTaskStatusService(taskId, checked);
        dispatch(updateTaskAction(task));
        dispatch(toggleTotalSelectedItemAction({taskId: result.draggableId, show: false}));
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

    const multiTask = (condition) => {
        const lengthTask = tasks.filter(item => {return item.selected}).length 
        if(lengthTask > 1) {
            tasks.map((item) => {
                if(item.selected) {
                    updateStatus(item._id, condition); 
                }
            }) 
        }
    }

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        
        if (result.source.droppableId === result.destination.droppableId) {
            reOrderList(result);
        }
        
        if(result.destination.droppableId !== result.source.droppableId) {
            if(result.type === 'DEFAULT') {
                switch(result.destination.droppableId) {
                    case 'droppable-1':
                        updateStatus(result.draggableId, true); 
                        multiTask(true);
                        break;
                    case 'droppable-0':
                        updateStatus(result.draggableId, false);
                        multiTask(false);
                        break;
                    case 'droppable-2':
                        showModal(result.draggableId);
                        break;
                    default:
                        break;
                }
            }            
        }

        dispatch(toggleTotalSelectedItemAction({taskId: result.draggableId, show: false}));
    }

    const onDragStart = (result) => {
        console.log('onDragStart', result);
    }

    const onDragUpdate = (result) => {
        dispatch(toggleTotalSelectedItemAction({taskId: result.draggableId, show: true}));
    }

    return (
        <>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
                    <Flex mt="5" align="flex-start" justify="stretch">
                        <Droppable droppableId="droppable-0">   
                            {(provided, snapshot) => (
                                <>
                                <Box 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                bg="gray.100" w="100%" flex='1'>
                                    <Flex bg="gray.300" textAlign={'left'} p={4} alignItems='center' alignSelf={'center'}>
                                        <Icon w={6} h={6} color="gray.500" as={RiFileList3Line} mr="2"/> <Text color="gray.600" alignItems={'center'}>Process</Text>
                                    </Flex>
                                    <Box p={4}>
                                        <ListTask tasks={tasks} conditionFilter={false} selectedItemId={selectedItemId} />
                                    </Box>
                                </Box>
                                <Box display="none">{provided.placeholder}</Box>
                                </>
                        )}
                        </Droppable>
                        <Droppable droppableId="droppable-1">   
                            {(provided, snapshot) => (
                                <Box 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                mt="0" mx="5" w="100%" bg="green.300" flex='1'>
                                    <Flex bg="green.500" textAlign={'left'} p={4} alignItems='center' alignSelf={'center'}>
                                        <Icon w={7} h={7} color="green.200" as={AiOutlineFileDone} mr="2"/> <Text color="green.200" alignItems={'center'}>Done</Text>
                                    </Flex>
                                    <Box p={4}>
                                        <ListTask  tasks={tasks} conditionFilter={true} selectedItemId={selectedItemId} />
                                    </Box>
                                    <Box display="none">{provided.placeholder}</Box>
                                </Box>
                        )}
                        </Droppable>
                        <Flex mt="0" padding="5" h="100px" align={'center'} justify='center'>
                            <Droppable droppableId="droppable-2">   
                                {(provided, snapshot) => (
                                    <>
                                    <Circle
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    position="relative"
                                    style={getListStyleDelete(snapshot.isDraggingOver)}
                                    _before={{ content: '""', background: "transparent", border:"3px solid tomato", transform: `${snapshot.isDraggingOver ? 'scale(1.2)' : 'none'}`,zIndex: "-1", transition: ".2s ease-in-out",
                                    borderRadius: "100%", position: "absolute", top: "0", left: "0", right: "0", bottom: "0"}}
                                    bg="red.400" size={"80px"} align={'center'}>
                                        <Icon color="white" w={6} h={6} as={VscTrash}/>
                                    </Circle>
                                    <Box display="none">{provided.placeholder}</Box>
                                    </>
                                )}
                            </Droppable>
                        </Flex>  
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