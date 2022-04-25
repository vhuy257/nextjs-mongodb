import  { connectToDatabase } from '../../../lib/mongodb';
import {TaskCollectionName} from '../../../lib/constant';

export default async (req, res) => {
    const { db } = await connectToDatabase();
    res.setHeader('Content-Type', 'application/json');
    try {
        const taskList = await db.collection(TaskCollectionName).remove({});

        res.end(JSON.stringify(taskList));   
    } catch (error) {
        errorres.end(error);
    }
}