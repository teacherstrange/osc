import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('gateway hello');

// If we're in local development we're going to bypass the managed federation and use Introspect and Compose
// Using managed federation seems to have issues with URLs in local development despite documentation saying it should be fine
// Current assumption is that federations expects a hosted server.
// If not development ApolloGateway() will automatically utilise API key/graph ref to query studio
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
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    });
    console.log(`🚀  Server ready at: ${url}`);
}

void startServer(server);
