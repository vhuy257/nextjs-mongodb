import React from 'react';
import { Flex, Box, Square, Icon, Text } from '@chakra-ui/react'
import ListTask from './ListTask';
import { BsPatchCheck, BsTrash } from 'react-icons/bs';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
    width: '100%'
});

const TaskDragDrop = ({tasks, condition, selectedItemId}) => {
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">   
            {(provided, snapshot) => (
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                > {provided.placeholder}
                    <Flex mt="5">
                        <Box bg="gray.100" borderRadius={5} padding="10" flex='1'>
                            <ListTask  tasks={tasks} condition={condition} selectedItemId={selectedItemId} />
                        </Box>
                        <Square mt="0" mx="5" bg="green.100" borderRadius={5} padding="10" flex='1'>
                            <Icon color="black" as={BsPatchCheck} mr="3" /> <Text color="black"> Task done </Text>
                        </Square>
                        <Square bg="red.100" borderRadius={5} padding="10" flex='1'>
                            <Icon color="black" as={BsTrash} mr="3" /> <Text color="black"> Delete task </Text>
                        </Square>
                    </Flex>
                </div>
            )}
            </Droppable>
        </DragDropContext>
    )
}

export default TaskDragDrop;