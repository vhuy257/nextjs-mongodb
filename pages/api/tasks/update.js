import  { connectToDatabase } from '../../../lib/mongodb';
import { TaskCollectionName } from '../../../lib/constant';
import { ObjectId } from 'mongodb';
export default async(req, res) => {
    const { db } = await connectToDatabase();
    res.setHeader('Content-Type', 'application/json');
    try {
        const setObject = req.body.hasOwnProperty('isComplete') ? { isComplete: req.body.isComplete } : { summary: req.body.summary };
        const updatedTask = await db.collection(TaskCollectionName).updateOne( {_id: ObjectId(req.body._id)}, { $set: setObject } );
        return res.end(JSON.stringify(updatedTask));
    } catch (error) {
        res.end(error);
    }
}