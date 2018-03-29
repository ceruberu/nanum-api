import express from "express";
import graphqlHTTP from "express-graphql";
import { MongoClient, ObjectId } from 'mongodb';
import schema from "./graphql/schema";
import { mongoUrl } from "./credentials.json";

// const Shows = db.collection('shows');

const app = express();
const dev = process.env.NODE_ENV === 'development';
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: dev
}));

app.use('/', (req, res) => {
  res.json('Go to /graphql to test your queries and mutations!');
});

const server = app.listen(3000, () => {
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
