import  { connectToDatabase } from '../../../lib/mongodb';
import { TaskCollectionName } from '../../../lib/constant';
import { ObjectId } from 'mongodb';

export default async(req, res) => {
    const { db } = await connectToDatabase();
    res.setHeader('Content-Type', 'application/json');
    try {
        await db.collection(TaskCollectionName).updateOne( {_id: ObjectId(req.body.sortObj.idStart)}, { $set: {sortIndex: req.body.sortObj.endIndex} } );
        await db.collection(TaskCollectionName).updateOne( {_id: ObjectId(req.body.sortObj.idEnd)}, { $set: {sortIndex: req.body.sortObj.startIndex} } );
        return res.end(JSON.stringify({updated: "Update done"}));
    } catch (error) {
        res.end(error);
    }
}