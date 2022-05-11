import  { connectToDatabase } from '../../../lib/mongodb';
import { TaskCollectionName } from '../../../lib/constant';
import { ObjectId } from 'mongodb';
export default async(req, res) => {
    const { db } = await connectToDatabase();
    res.setHeader('Content-Type', 'application/json');
    try {
        const setObject = {
            isComplete: req.body?.isComplete,
            summary: req.body?.summary,
            sortIndex: req.body?.sortIndex
        };
        
        for(var propName in setObject) {
            if (setObject[propName] === null || setObject[propName] === undefined) {
                delete setObject[propName];
            }
        }
        
        console.log(setObject);
        const updatedTask = await db.collection(TaskCollectionName).updateOne( {_id: ObjectId(req.body._id)}, { $set: setObject } );
        return res.end(JSON.stringify(updatedTask));
    } catch (error) {
        res.end(error);
    }
}