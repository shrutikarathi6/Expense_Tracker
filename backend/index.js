import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import mergeresolvers from './resolvers/index.js';
import mergetypeDefs from './typeDefs/index.js';
import { connectDb } from './db/connectdb.js';

const app = express();
await connectDb();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs: mergetypeDefs,
  resolvers: mergeresolvers,
});

// Start the Apollo server
await server.start();

// Apply middleware for Apollo Server and Express.js
app.use(
  '/graphql',
  cors(), // Enable CORS
  bodyParser.json(), // Parse JSON bodies
  expressMiddleware(server)
);

// Start the Express server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});


