import { connectToDatabase } from '../../../lib/mongodb';
import { TaskCollectionName } from '../../../lib/constant';

export default async(req, res) => {
    const { db } = await connectToDatabase();
    res.setHeader('Content-Type', 'application/json');
    try {
        const result = req.body.searchTerm ? await db.collection(TaskCollectionName).find({ "summary":{$regex: req.body.searchTerm}}).limit(20).toArray() : await db.collection(TaskCollectionName).find({}).limit(20).toArray();
        return res.end(JSON.stringify(result));
    } catch (error) {
        res.end(error);
    }
}