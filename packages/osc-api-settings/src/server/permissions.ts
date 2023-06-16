import { shield } from 'graphql-shield';

export const shieldPermissions = shield({
    Query: {},
});
