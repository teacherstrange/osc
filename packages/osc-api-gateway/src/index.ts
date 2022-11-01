import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

// If we're in local development we're going to bypass the managed federation and use Introspect and Compose
// We do not want to provide a routing url to apollo studio pointing at our local as it's not really built for it
const gateway =
    process.env.NODE_ENV === 'development'
        ? new ApolloGateway({
              supergraphSdl: new IntrospectAndCompose({
                  subgraphs: [{ name: 'OSC-Auth', url: process.env.AUTH_API_URL }]
              })
          })
        : new ApolloGateway();

const server = new ApolloServer({
    gateway
});

async function startServer(server: ApolloServer) {
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Gateway ready at http://localhost:4000${server.graphqlPath}`)
    );
}

void startServer(server);
