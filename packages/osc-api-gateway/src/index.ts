import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import * as dotenv from 'dotenv';
import express from 'express';
import { expressjwt } from 'express-jwt';

dotenv.config();
const app = express();

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET!,
        audience: process.env.JWT_AUDIENCE!,
        algorithms: ['HS256'],
        credentialsRequired: false
    })
);

// If we're in local development we're going to bypass the managed federation and use Introspect and Compose
// We do not want to provide a routing url to apollo studio pointing at our local as it's not really built for it
const gateway =
    process.env.NODE_ENV === 'development'
        ? new ApolloGateway({
              supergraphSdl: new IntrospectAndCompose({
                  subgraphs: [{ name: 'OSC-Auth', url: process.env.AUTH_API_URL }]
              }),
              buildService({ name, url }) {
                  return new RemoteGraphQLDataSource({
                      url,
                      willSendRequest({ request, context }) {
                          request?.http?.headers.set(
                              'user',
                              context.user ? JSON.stringify(context.user) : ''
                          );
                      }
                  });
              }
          })
        : new ApolloGateway({
              buildService({ name, url }) {
                  return new RemoteGraphQLDataSource({
                      url,
                      willSendRequest({ request, context }) {
                          request?.http?.headers.set(
                              'user',
                              context.user ? JSON.stringify(context.user) : ''
                          );
                      }
                  });
              }
          });

const server = new ApolloServer({
    gateway,
    context: ({ req }) => {
        // @ts-ignore
        const user = req.auth?.user || null;
        return { user };
    }
});

async function startServer(server: ApolloServer) {
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Gateway ready at http://localhost:4000${server.graphqlPath}`)
    );
}

void startServer(server);
