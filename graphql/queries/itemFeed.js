import { ObjectId } from 'mongodb';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import koLocale from 'date-fns/locale/ko';

export default async function itemFeed (parentValue, { limit, after, city, cursor }, req) {
  console.log("QUERY::", parentValue, limit, after, city, cursor);
  let edgesArray = [];
  const filter = {
    ...after && {
      _id: {
        $lt: ObjectId(after)
      }
    }
  };
  const sorter = {
    _id: -1
  };

  console.log("FILTER", filter);

  const itemsCollection = req.app.get("db").collection("Items");
  var itemsCursor = await itemsCollection.find(filter).limit(limit+1).sort(sorter);

  // Get array of edges
  let items = await itemsCursor.toArray();

  // Check if array is longer than the limit
  let hasNextPage; 
  if ( items.length > limit ) {
    items.pop();
    hasNextPage = true;
  } else {
    hasNextPage = false;
  }

  let edges = items.map(item => {
    item.fromNow = distanceInWordsToNow(ObjectId(item._id).getTimestamp(), {
      addSuffix: true,
      locale: koLocale
    });
    
    return {
      cursor: item._id,
      node: item
    };
  });

  // Get pageInfo
  let pageInfo = {
    endCursor: edges[edges.length-1].cursor,
    hasNextPage
  };

  return {
    edges,
    pageInfo
  };
}