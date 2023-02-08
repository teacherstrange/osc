import type { ApolloServerPlugin } from '@apollo/server';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'apollo-server-core';
import type { GraphQLSchema } from 'graphql';
import {
    constraintDirectiveTypeDefs,
    createApolloQueryValidationPlugin,
} from 'graphql-constraint-directive';
import depthLimit from 'graphql-depth-limit';
import { applyMiddleware } from 'graphql-middleware';
import { resolvers } from '~/resolvers/resolver';
import { typeDefs } from '~/schemas/schema';
import type { AssignmentsContext } from '~/types/interfaces';
import { shieldPermissions } from './permissions';

export const server = () => {
    const schema = applyMiddleware(
        buildSubgraphSchema([
            {
                typeDefs,
                resolvers,
            },
            { typeDefs: gql(constraintDirectiveTypeDefs) },
        ]),
        shieldPermissions
    );

    // Temporary type definition override
    // Waiting on graphql-constraint-directive to patch for v4 of apollo-server
    // Issue: https://github.com/confuser/graphql-constraint-directive/issues/128
    type validationPluginFactory = (options: { schema: GraphQLSchema }) => ApolloServerPlugin;
    const plugins = [(createApolloQueryValidationPlugin as validationPluginFactory)({ schema })];

    return new ApolloServer<AssignmentsContext>({
        schema,
        plugins,
        validationRules: [depthLimit(7)],
    });
};
