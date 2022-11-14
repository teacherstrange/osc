import { and, or, shield } from 'graphql-shield';
import {
    canCreateUser,
    canListOthers,
    canReadOwnAccount,
    canViewOther,
    isAuthenticated,
    isReadingOwnAccount
} from '~/server/rules';

export const shieldPermissions = shield({
    Query: {
        users: and(isAuthenticated, canListOthers),
        user: and(isAuthenticated, or(and(canReadOwnAccount, isReadingOwnAccount), canViewOther))
    },
    Mutation: {
        createUser: and(isAuthenticated, canCreateUser)
    }
});
