import { GraphQLScalarType } from 'graphql';
import { makeExecutableSchema } from "graphql-tools";
import { iterateItem } from './helper';
import Scalars from './scalars';
import Pagination from './pagination';
import CursorType from './cursor';
import Item from "./item";
import User from "./user";

let items = [
  {
    "id": 1,
    "title": "전신거울 필요하신분 무료나눔해요",
    "content": `댓글이나 전화주세요`,
    // User object
    "donator": "USERID12345",
    "tags": ["#거울", "#전신거울"],
    "date_publisheed": "2018-3-28",
    // indexed
    "date_updated": "2018-3-29",
    "date_finished": null,
    "image_url": "ASDASD",
    "city" : "서울",
    "district" : "송파구",
    "neighborhood" : "삼전동",
    // Request Objects
    "requests": [{
      "requestID": "REQUEST1234",
      "requestorID": "USERID1234"
      },],

  }
];

const RootQuery = `
  type Query {
    items(limit: Int = 10): [Item]
    user: User
    mainQuery(limit: Int = 10): mainQuery
  }
`;

const RootMutation = `
  type Mutation {
    createUser(input:UserInput): User
    createItem(input:ItemInput): Item
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;  

const resolvers = {
  Cursor: CursorType,
  Query: {
    user: (parentValue, args, req) => {

    },
    items: (parentValue, args, req) => {
      const itemsCollection = req.app.get("db").collection("Items");
      // return itemsCollection.find({})
      // .then(result => {
      //   console.log(result);
      //   return result;
      // })
      // .catch(err => {
      //   console.log(err);
      //   return err;
      // })
      var myCursor = itemsCollection.find().limit(20);
      myCursor.count().then(result=>{
        console.log(result);
      })
      // myCursor.toArray().then( result => {
      //   console.log("ARRAY:: ", result);
      // })
      // console.log("NEXT::", myCursor.hasNext().then( result => {
      //   console.log(result);
      // }));

      // var nextCursor = myCursor.next();
      // nextCursor.toArray().then( result => {
      //   console.log("NEXT ARRAY:: ", result);
      // })

      // console.log(my)
      // myCursor.toArray().then( result => {
      //   console.log("ARRAY:: ", result);
      //   myCursor.next().then( result => {
      //     console.log("NEXT:: ", result);
      //   })
      // })

    },
    mainQuery: async (parentValue, { limit, after, city }, req) => {
      let edgesArray = [];
      const filter = {
        _id: {}
      };
      if (after) {
        filter._id.$gt = after;
      }
      if (city) {
        filter.city = city;
      }

      const itemsCollection = req.app.get("db").collection("Items");
      var itemsCursor = await itemsCollection.find().limit(limit+1);

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
    
  },
  Mutation: {
    createUser: (parentValue, { input }, req) => {
      const usersCollection = req.app.get("db").collection("Users");
      return usersCollection.insertOne({
        ...input
      }).then( result => {
        return result.ops[0];
      }).catch( err => {
        return err;
      })
    },
    createItem: (parentValue, { input }, req) => {
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
  }

}

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    RootMutation,   
    Pagination,
    Scalars,
    Item,
    User
  ],
  resolvers
});