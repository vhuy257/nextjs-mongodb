import React from 'react';
import { List } from '@chakra-ui/react'
import ItemTask from './ItemTask';
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    ...draggableStyle
});

const ListTask = ({tasks, conditionFilter,}) => {    
    return (
        <>
            <List>
                {tasks.sort((a,b) => {return a.sortIndex - b.sortIndex} ).map((item, key) => item.isComplete === conditionFilter && (
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
                                <ItemTask key={key} item={item}/>
                            </div>
                        )}
                    </Draggable>
                ))}
            </List>
        </>
    )
}

export default ListTask;
