import React, { useContext } from 'react';
import { Checkbox, IconButton, Text, ListItem, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import styles from './task.module.css';
import Moment from 'react-moment';

const ItemTask = ({item, onOpen}) => {

    return ( 
        <ListItem
            boxShadow='base'
            bg="white"
            p={[2,3]}
            borderRadius={5}
            className={`${styles.taskItem} item--${item._id}`}>
            <Box className="item__left">
                    <Text fontSize='sm' color='black' align='left' ml="3" htmlFor={`checkbox__${item._id}`}>    
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