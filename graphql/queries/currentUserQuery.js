import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { secret } from '../../credentials.json';

export default async function (parentValue, { token }, req) {
  return jwt.verify(token, secret, async (err, decoded) => {
    if (err){
      throw err;
    } else {
      const usersCollection = req.app.get("db").collection("Users");
      const { userId } = decoded;
      const user = await usersCollection.findOne({'_id': ObjectId(userId)});
      if(!user){
        // USER NO LONGER EXISTS
        throw err;
      }
      return user;
    } 
  });
}