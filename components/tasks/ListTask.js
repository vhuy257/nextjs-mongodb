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
    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    }

    return (
        <>
            <List>
                {tasks.map((item, key) => item.isComplete === conditionFilter && (
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
