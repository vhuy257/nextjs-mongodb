import  { connectToDatabase } from '../../../lib/mongodb';
import {TaskCollectionName} from '../../../lib/constant';
import { ObjectId } from 'mongodb';

export default async(req, res) => {
    const { db } = await connectToDatabase();
    res.setHeader('Content-Type', 'application/json');
    try {
        const insertTask = await db.collection(TaskCollectionName).insertOne(req.body);
        res.end(JSON.stringify(insertTask));
    } catch (error) {
        res.end(error);
    }
}