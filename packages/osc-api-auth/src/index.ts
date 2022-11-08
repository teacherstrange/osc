import * as dotenv from 'dotenv';
import type { ApolloServerPlugin } from '@apollo/server';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import depthLimit from 'graphql-depth-limit';
import { typeDefs } from './schemas/schema';
import { resolvers } from './resolvers/resolver';
import { buildSubgraphSchema } from '@apollo/subgraph';
import {
    createApolloQueryValidationPlugin,
    constraintDirectiveTypeDefs
} from 'graphql-constraint-directive';
import { gql } from 'apollo-server-core';
import type { GraphQLSchema } from 'graphql';
dotenv.config();

async function startServer() {
    const schema = buildSubgraphSchema({
        typeDefs: [gql(constraintDirectiveTypeDefs), typeDefs],
        resolvers
    });

    // Temporary override type definition
    // Waiting on graphql-constraint-directive to patch for v4 of apollo-server
    // Issue: https://github.com/confuser/graphql-constraint-directive/issues/128
    type validationPluginFactory = (options: { schema: GraphQLSchema }) => ApolloServerPlugin;
    const plugins = [(createApolloQueryValidationPlugin as validationPluginFactory)({ schema })];

    const server = new ApolloServer({
        schema,
        plugins,
        validationRules: [depthLimit(7)]
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4001 }
    });
    console.info(`🚀 Auth Microservice ready at: ${url}`);
}

void startServer();
