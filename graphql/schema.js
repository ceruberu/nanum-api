import { GraphQLScalarType } from 'graphql';
import { makeExecutableSchema } from "graphql-tools";
import { ObjectId } from 'mongodb';
import { iterateItem } from './helper';
import Scalars from './scalars';
import Pagination from './pagination';
import CursorType from './cursor';
import Item from "./item";
import User from "./user";
import QueryResolvers from "./queries";  
import MutationResolvers from "./mutations";

const RootQuery = `
  type Query {
    items(limit: Int = 10): [Item]
    user: User
    itemFeed(limit: Int!, after: Cursor): itemFeed
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
  Query: QueryResolvers,
  Mutation: MutationResolvers
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