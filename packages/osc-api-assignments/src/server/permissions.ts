import { shield } from 'graphql-shield';
import { isAuthenticated } from './rules';

export const shieldPermissions = shield(
    {
        Query: {
            uploadUrl: isAuthenticated,
        },
        // Mutation: {},
    },
    { debug: true }
);
