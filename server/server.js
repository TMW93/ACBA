const express = require('express');
const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@as-integrations/express5');
const path = require('path');
const favicon = require('serve-favicon');
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

  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    const clientDist = path.join(__dirname, '../client/dist');

    // Serve static files normally
    app.use(express.static(clientDist, { fallthrough: true }));

    // Catch-all fallback using middleware, not a route
    app.use((req, res, next) => {
      res.sendFile(path.join(clientDist, 'index.html'));
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