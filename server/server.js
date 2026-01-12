// const express = require('express');
import express from 'express'
const {ApolloServer} = require('@apollo/server');
// const {expressMiddleware} = require('@as-integrations/express5');
import { expressMiddleware } from '@as-integrations/express5';
// const path = require('path');
import path from 'path'
const {authMiddleware} = require('./utils/auth');

const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  // console.log('Express version:', require('express/package.json').version);
  await server.start();

  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('/:path(*)', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }


  db.once('open', () => {
    app.listen(PORT, () => {
      console.log('API server running on port ${PORT}.');
      console.log('Use GraphQL at localhost:${PORT}/graphql');
    });
  });
};

startApolloServer();