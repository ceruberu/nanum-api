import express from "express";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import graphqlHTTP from "express-graphql";
import { MongoClient, ObjectId } from 'mongodb';

import schema from "./graphql/schema";
import { mongoUrl } from "./credentials.json";

// const Shows = db.collection('shows');

const app = express();
const dev = process.env.NODE_ENV === 'development';

app.use(logger('dev'));
// app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
// app.use(/\/((?!graphql).)*/, bodyParser.json());
// app.use(cookieParser());
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  // formatError: error => ({
  //   message: error.message,
  //   locations: error.locations,
  //   stack: error.stack ? error.stack.split('\n') : [],
  //   state: error.originalError && error.originalError.state,
  //   path: error.path
  // }),
  graphiql: dev
}));

app.use('/', (req, res) => {
  res.json('Go to /graphql to test your queries and mutations!');
});

const server = app.listen(4000, () => {
  const { port } = server.address();
  console.info(`\n\nExpress listen at http://localhost:${port} \n`);
});

MongoClient.connect(mongoUrl).then(client => {
  console.log("Welcome to MongoDB");
  const db = client.db('nanum');
  app.set("db", db);
}).catch(err => {
  console.log(err);
});
