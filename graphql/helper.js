export async function iterateItem(cursor){
  let edgesArray = await cursor.map( item => {
    console.log("ITERATE:: ", item);
    return {
      cursor: item._id,
      node: item
    }
  })
  return edgesArray;
} 