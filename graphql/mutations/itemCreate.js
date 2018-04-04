export default function (parentValue, { input }, req) {
  const itemsCollection = req.app.get("db").collection("Items");
  console.log("INPUT:: ", input);
  // For insert in real database
  // let items = [];
  // for(var i = 0; i < 100; i++){
  //   items.push({
  //     title: `무료나눔${i}` 
  //   })
  // }
  // return itemsCollection.insertMany(items).then(result=>result);

  return itemsCollection.insertOne({
    ...input
  }).then( result => {
    console.log("RESPONSE:: ", result.ops);
    return result.ops[0];
  }).catch( err => {
    console.log("ERR:: ", err);
    return err;
  })
}