import React from 'react';
import { motion } from "framer-motion";
import { Heading, Divider } from '@chakra-ui/react'
import ItemTask from './ItemTask';

const ListTask = ({tasks, condition}) => {
    return (
        <>
            <Heading align="left" mb="3">
                List Task
            </Heading>
            <Divider mb="7"/>
            <motion.ul>
                {condition === 'ALL' && tasks.map((item, key) => (
                    <ItemTask key={key} item={item}/>    
                ))}
                {tasks.map((item, key) => item.isComplete === condition && (
                    <ItemTask key={key} item={item}/>
                ))}
            </motion.ul>
        </>
    )
}

export default ListTask;
