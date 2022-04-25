import  { connectToDatabase } from '../../../lib/mongodb';
import { TaskCollectionName } from '../../../lib/constant';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase(); const { pid } = req.query;
    res.setHeader('Content-Type', 'application/json');
    try {
        const result = await db.collection(TaskCollectionName).deleteOne({"_id": ObjectId(pid)});
        res.end(JSON.stringify(result));
    } catch (error) {
        res.end(JSON.stringify(error));
    }
}