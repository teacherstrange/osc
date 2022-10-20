import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import depthLimit from 'graphql-depth-limit';
import * as dotenv from 'dotenv';
import { typeDefs } from './schemas/schema';
import { resolvers } from './resolvers/resolver';

dotenv.config();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(7)]
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);
