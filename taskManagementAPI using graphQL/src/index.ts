import 'dotenv/config';
import express from 'express';
import { json } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/schema';
import { formatGraphQLError, resolvers } from './graphql/resolvers';
import { prisma } from './lib/prisma';

const initializeGraphQLServer = async () => {
  try {
    const app = express();
    const port = process.env.PORT || 5000;

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (formattedError, error) => formatGraphQLError(formattedError, error.originalError),
    });

    await server.start();

    app.use(
      '/graphql',
      json(),
      expressMiddleware(server, {
        context: async () => ({
          prisma,
        }),
      })
    );

    app.listen(port, () => {
      console.log(`🚀 GraphQL server ready at http://localhost:${port}/graphql`);
    });
  } catch (e) {
    console.error(e);
  }
};

initializeGraphQLServer();
