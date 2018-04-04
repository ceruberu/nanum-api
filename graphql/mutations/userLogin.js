export default function (parentValue, { input }, req) {
  console.log("LOCAL LOGIN INPUT:: ", input);
  const usersCollection = req.app.get("db").collection("Users");
  return usersCollection.insertOne({
    ...input
  }).then( result => {
    return result.ops[0];
  }).catch( err => {
    return err;
  })

  return usersCollection.findOne({
    email
  })
};