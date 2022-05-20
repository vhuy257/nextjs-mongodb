import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Flex, Box, Icon, Text } from '@chakra-ui/react';

import ListTask from './ListTask';

const DroppAbleZone = ({droppableId, tasks, selectedItemId, conditionFilter, title, bgTitle, icon, bg, color, iconColor}) => {
    return (
        <Droppable 
        droppableId={droppableId}>   
            {(provided, snapshot) => (
                <>
                    <Box 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    mr="10"
                    bg={bg} w="100%" flex='1'>
                        <Flex bg={bgTitle} textAlign={'left'} p={4} alignItems='center' alignSelf={'center'}>
                            <Icon w={6} h={6} color={iconColor} as={icon} mr="2"/> <Text color={color} alignItems={'center'}>{title}</Text>
                        </Flex>
                        <Box p={tasks.length ? 4 : 0}>
                            <ListTask tasks={tasks} conditionFilter={conditionFilter} />
                        </Box>
                    </Box>
                    <Box display="none">{provided.placeholder}</Box>
                </>
        )}
        </Droppable>
    )
}

export default DroppAbleZone;