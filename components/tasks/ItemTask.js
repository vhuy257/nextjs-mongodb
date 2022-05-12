import React from 'react';
import { Text, ListItem, Box } from '@chakra-ui/react'
import styles from './task.module.css';
import Moment from 'react-moment';

const ItemTask = ({item}) => {

    return ( 
        <ListItem
            boxShadow='base'
            bg={`${item.isComplete ? 'green.100' : 'white'}`}
            p={[3,2]}
            borderRadius={5}
            className={`${styles.taskItem} item--${item._id}`}>
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
        </ListItem>
    )
};

export default ItemTask;