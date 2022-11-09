import type { ApolloServerPlugin } from '@apollo/server';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'apollo-server-core';
import type { GraphQLSchema } from 'graphql';
import {
    constraintDirectiveTypeDefs,
    createApolloQueryValidationPlugin
} from 'graphql-constraint-directive';
import depthLimit from 'graphql-depth-limit';
import { resolvers } from '~/resolvers/resolver';
import { typeDefs } from '~/schemas/schema';

export const server = () => {
    const schema = buildSubgraphSchema({
        typeDefs: [gql(constraintDirectiveTypeDefs), typeDefs],
        resolvers
    });

    // Temporary type definition override
    // Waiting on graphql-constraint-directive to patch for v4 of apollo-server
    // Issue: https://github.com/confuser/graphql-constraint-directive/issues/128
    type validationPluginFactory = (options: { schema: GraphQLSchema }) => ApolloServerPlugin;
    const plugins = [(createApolloQueryValidationPlugin as validationPluginFactory)({ schema })];

    return new ApolloServer({
        schema,
        plugins,
        validationRules: [depthLimit(7)]
    });
};
