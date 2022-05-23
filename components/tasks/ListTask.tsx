import React, { useContext } from 'react';
import { List } from '@chakra-ui/react'
import ItemTask from './ItemTask';
import { Draggable } from "react-beautiful-dnd";
import {
    selectMultiTaskAction
} from '../../store/actions';
import { AppContext } from '../../pages';

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    borderRadius: "5px",
    background: isDragging ? "#f3f3f3" : "white",
    ...draggableStyle
});

const ListTask = ({tasks, conditionFilter}) => {    
    const {dispatch}: any = useContext(AppContext);

    const onKeyDown = (e, snapshot, item) => {
        if (snapshot.isDragging) {
            return;
        }
        if (e.defaultPrevented) {
            return;
        }
        if (e.keyCode !== 13) {
            return;
        }  
        e.preventDefault(); performAction(e, item);
    }   

    const onClick = (e, item) => {
        if (e.defaultPrevented) {
            return;
        }
        if (e.button !== 0) {
            return;
        } 
        e.preventDefault();
        performAction(e, item);
    }

    const performAction = (e: any, item: any) => {
        if(e.shiftKey || e.ctrlKey) {
            item.selected = !item.selected;
            dispatch(selectMultiTaskAction(item));
        } 
    }

    return (
        <>
            <List
            maxHeight={'500px'}
            minHeight={'500px'}
            overflowY="scroll"
            pr={'10px'}
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#555',
                    borderRadius: '24px',
                },
            }}
            > 
                {tasks.sort((a,b) => {return a.sortIndex - b.sortIndex}).map((item, key) => item.isComplete === conditionFilter && (
                    <Draggable key={item._id} draggableId={item._id} index={key}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onKeyDown={(event) => {onKeyDown(event, snapshot, item)}}
                            onClick={(e) => {onClick(e, item)}}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
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
