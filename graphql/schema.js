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
import DirectiveResolvers from "./directives";

const RootQuery = `
  type Query {
    items(limit: Int = 10): [Item]
    user: User
    feedQuery(limit: Int!, after: Cursor): feedQuery
    currentUserQuery(token: String!): User
  }
`;

const RootMutation = `
  type Mutation {
    userLogin(input:LocalLoginInput): User
    userSignup(email:String!): User
    itemCreate(input:ItemInput): Item
    authenticateFacebookUser(facebookToken:String): String
  }
`;

const Directives = `
  directive @auth on FIELD_DEFINITION
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
    Directives, 
    Pagination,
    Scalars,
    Item,
    User
  ],
  resolvers,
  directiveResolvers: DirectiveResolvers
});