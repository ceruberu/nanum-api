import { GraphQLScalarType } from 'graphql';
import { makeExecutableSchema } from "graphql-tools";
import { ObjectId } from 'mongodb';
import { iterateItem } from './helper';
import Scalars from './scalars';
import Pagination from './pagination';
import CursorType from './cursor';
import Item from "./item";
import User from "./user";

const RootQuery = `
  type Query {
    items(limit: Int = 10): [Item]
    user: User
    mainQuery(limit: Int!, after: Cursor): mainQuery
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
    },
    mainQuery: async (parentValue, { limit, after, city, cursor }, req) => {
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