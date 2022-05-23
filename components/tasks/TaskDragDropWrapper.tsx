import React, { useContext } from 'react';
import { Flex, Box, Icon, useDisclosure, Circle } from '@chakra-ui/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
    updateTaskAction,
    setTaskIdAction,
    deleteTaskAction,
    redorderListAction,
    selectMultiTaskAction
} from '../../store/actions';
import {
    UpdateTaskStatusService,
    DeleteTaskService,
    UpdateSortOrderService
} from '../../services/TaskService';
import { VscTrash } from 'react-icons/vsc';
import { AiOutlineFileDone } from 'react-icons/ai';
import { RiFileList3Line } from 'react-icons/ri';
import { AppContext } from '../../pages';
import AlertDialog from '../AlertDialog/AlertDialog';
import DroppAbleZone from './Dropablezone';


const TaskDragDrop = ({tasks, selectedItemId}) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { dispatch }: any = useContext(AppContext);
    
    const updateStatus = async(taskId, checked) => {
        const task = {_id: taskId, isComplete: checked}
        await UpdateTaskStatusService(taskId, checked);
        dispatch(updateTaskAction(task));
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
        list.map((item: any, key) => {item.sortIndex = key})
        const sortObject = {arrayList: list}
        await UpdateSortOrderService(sortObject);
        dispatch(redorderListAction({startIndex: result.source.index, endIndex: result.destination.index}));
    }

    const multiTask = (condition) => {
        const lengthTask = tasks.filter(item => {return item.selected}).length; 
        if(lengthTask > 1) {
            tasks.map((item) => {
                if(item.selected) {
                    updateStatus(item._id, condition); 
                }
            }) 
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) { // dropped outside the list
          return;
        }
        if (result.source.droppableId === result.destination.droppableId) {
            reOrderList(result);
        }
        if(result.destination.droppableId !== result.source.droppableId) {
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
        tasks.map((item) => {
            item.selected = false;
            dispatch(selectMultiTaskAction(item))
        }); 
    }

    return (
        <>
        <DragDropContext onDragEnd={onDragEnd}>
                    <Flex mt="5" align="flex-start" justify="stretch">
                        <DroppAbleZone 
                            tasks={tasks} 
                            bg={'gray.200'} 
                            conditionFilter={false} 
                            bgTitle={'gray.400'} 
                            iconColor={'gray.500'} 
                            color={'gray.600'} 
                            icon={AiOutlineFileDone} 
                            title="To do" 
                            droppableId="droppable-0"/>
                        <DroppAbleZone 
                            tasks={tasks} 
                            bg={'green.300'} 
                            conditionFilter={true} 
                            bgTitle={'green.500'} 
                            color={'green.100'} 
                            icon={RiFileList3Line} 
                            title="Done" 
                            droppableId="droppable-1"/>
                        <Droppable droppableId="droppable-2">   
                            {(provided, snapshot) => (
                                <>
                                <Circle
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                position="relative"
                                transition="3s ease-in-out"
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