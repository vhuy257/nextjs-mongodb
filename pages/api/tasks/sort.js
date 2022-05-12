import { connectToDatabase } from '../../../lib/mongodb';
import { TaskCollectionName } from '../../../lib/constant';
import { ObjectId } from 'mongodb';

export default async(req, res) => {
    const { db } = await connectToDatabase();
    res.setHeader('Content-Type', 'application/json');
    try {
        await req.body.sortObj.arrayList.forEach(element => {
            db.collection(TaskCollectionName).updateOne( {_id: ObjectId(element._id)}, { $set: {sortIndex: element.sortIndex} } );
        });
        return res.end(JSON.stringify({updated: "Update done"}));
    } catch (error) {
        res.end(error);
    }
}