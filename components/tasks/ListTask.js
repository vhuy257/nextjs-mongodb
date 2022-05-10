import React, { useContext } from 'react';
import { List, useDisclosure } from '@chakra-ui/react'
import ItemTask from './ItemTask';
import AlertDialog from '../AlertDialog/AlertDialog';
import { AppContext } from '../../pages';
import {
    deleteTaskAction,
} from '../../store/actions';
import {
    DeleteTaskService,
} from '../../services/TaskService';
import { Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    //padding: grid * 2,
    //margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    //background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
});

const ListTask = ({tasks, condition, selectedItemId}) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { dispatch } = useContext(AppContext);

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    }

    const deleteTask = async() => {
        await DeleteTaskService(selectedItemId);
        dispatch(deleteTaskAction(selectedItemId));
        onClose();
    }

    return (
        <>
            <List>
                {condition === 'ALL' && tasks.map((item, key) => (
                    <Draggable key={item._id} draggableId={item._id} index={key}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                                )}
                            >
                                <ItemTask key={key} onOpen={onOpen} item={item}/>    
                            </div>
                        )}
                    </Draggable>
                ))}
                {tasks.map((item, key) => item.isComplete === condition && (
                    <Draggable key={item._id} draggableId={item._id} index={key}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                                )}
                            >
                                <ItemTask key={key} onOpen={onOpen} item={item}/>
                            </div>
                        )}
                    </Draggable>
                ))}
            </List>
            <AlertDialog 
                onClose={onClose} 
                isOpen={isOpen} 
                onAction={deleteTask} 
                dialogBody='Are you sure you want to delete this item?' 
                dialogHeader='Delete tasks'/>
        </>
    )
}

export default ListTask;
