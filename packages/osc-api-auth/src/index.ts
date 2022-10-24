import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import depthLimit from 'graphql-depth-limit';
import * as dotenv from 'dotenv';
import { typeDefs } from './schemas/schema';
import { resolvers } from './resolvers/resolver';
import { buildSubgraphSchema } from '@apollo/subgraph';

dotenv.config();

console.log('auth hello');

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    validationRules: [depthLimit(7)]
});

async function startServer(server: ApolloServer) {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4001 }
    });
    console.log(`🚀  Server ready at: ${url}`);
}

void startServer(server);
