import React from 'react';
import { Text, ListItem, Box, Badge } from '@chakra-ui/react'
import styles from './task.module.css';
import Moment from 'react-moment';

const ItemTask = ({item, totalSelectedItem}) => {   
    return ( 
        <ListItem
            boxShadow='base'
            bg={`${item.selected ? '#f3f3f3' : 'white'}`}
            p={[3,2]}
            borderRadius={5}
            tabIndex="0"
            className={`${styles.taskItem} item--${item._id}`} position="relative">
            <Box className="item__left">
                    <Text fontSize='lg' color='black' align='left' ml="3" htmlFor={`checkbox__${item._id}`}>    
                        {item.summary}
                    </Text>
                    <Text fontSize='xs' ml="3" color='gray' align='left' isTruncated>
                        <Moment format="D MMM YYYY">
                            {item.dateCreated}
                        </Moment> 
                    </Text>
            </Box>
            {item.showTotal && (
                totalSelectedItem > 1 && <Badge position={'absolute'} minW='20px' minH='20px' top={'-10px'} right={'-5px'} borderRadius="100%" bg='tomato'>{totalSelectedItem}</Badge>
            )}
        </ListItem>
    )
};

export default ItemTask;