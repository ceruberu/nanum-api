import { makeExecutableSchema } from "graphql-tools";
import Scalars from './scalars';
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
  Query: {
    items: (parentValue, args, req) => items,
    user: (parentValue, args, req) => {

    }
  },
  Mutation: {
    createUser: (parentValue, { input }, req) => {

    },
    createItem: (parentValue, { input }, req) => {
    }
  }

}

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    RootMutation,   
    Scalars,
    Item,
    User
  ],
  resolvers
});