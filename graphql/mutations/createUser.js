export default function createUser (parentValue, { input }, req){
  const usersCollection = req.app.get("db").collection("Users");
  return usersCollection.insertOne({
    ...input
  }).then( result => {
    return result.ops[0];
  }).catch( err => {
    return err;
  })
};