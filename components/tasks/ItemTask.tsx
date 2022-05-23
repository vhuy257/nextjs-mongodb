import React from 'react';
import { Text, ListItem, Box, Badge } from '@chakra-ui/react'
import styles from './task.module.css';
import Moment from 'react-moment';

const ItemTask = ({item}) => {   
    return ( 
        <ListItem
            boxShadow='base'
            bg={`${item.selected ? '#f3f3f3' : 'white'}`}
            p={[3,2]}
            borderRadius={5}
            tabIndex={0}
            className={`${styles.taskItem} item--${item._id}`} position="relative">
            <Box className="item__left" textAlign={'left'} pl="3">
                    <Text fontSize='lg' color='black' align='left'>    
                        {item.summary}
                    </Text>
                    <Badge variant='solid' colorScheme='green'>
                        <Moment format="D MMM YYYY">
                            {item.dateCreated} 
                        </Moment> 
                    </Badge>
            </Box>
        </ListItem>
    )
};

export default ItemTask;