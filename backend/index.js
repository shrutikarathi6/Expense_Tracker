import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import mergeresolvers from './resolvers/index.js';
import mergetypeDefs from './typeDefs/index.js';
import { connectDb } from './db/connectdb.js';

import passport from 'passport';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import { GraphQLLocalStrategy,buildContext } from 'graphql-passport';

import { configurepassport } from './passport/passport.config.js';

configurepassport()

const app = express();
await connectDb();

const mongodbStore = ConnectMongoDBSession(session)
const store = new mongodbStore({
  uri:"mongodb+srv://shrutikarathi6:expense_tracker@cluster0.xrzuo.mongodb.net/",
  collection:"sessions"

})

store.on("error",(err)=>{
  console.log(err);
  console.log("error in mongodb store in index.js")
})
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
  cors({
    origin:"http://localhost:3000",
    credentials:true
  }), // Enable CORS
  bodyParser.json(), // Parse JSON bodies
  expressMiddleware(server,{
    context:async ({req,res})=> buildContext({req,res})
  })
);

app.use(
  session({
    secret : "Shrutika",
    resave : false,  //whether to save the session to store on every req
    saveUninitialized:false, //whether to save uninitialized session
    cookie:{
      maxAge : 1000*60*60*24*7,
      httpOnly:true,
    },
    store :store
  })
)

app.use(passport.initialize());

app.use(passport.session());

// Start the Express server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});


