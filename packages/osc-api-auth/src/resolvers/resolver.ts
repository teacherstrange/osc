import type { User } from '@prisma/client';
import type {
    createUserArgs,
    getUserArgs,
    getUsersArgs,
    loginArgs,
    refreshAccessArgs
} from '~/types/arguments';
import type { AuthContext } from '~/types/interfaces';
import * as account from '~/utils/account';

export const resolvers = {
    Query: {
        users: async (_: undefined, args: getUsersArgs) => {
            return await account.getMultiple(args);
        },
        user: async (_: undefined, args: getUserArgs, { user }: AuthContext) => {
            return await account.get(args.id ?? user!.id);
        }
    },
    User: {
        profile: async ({ id }: User) => {
            return await account.profile(id);
        }
    },
    Mutation: {
        createUser: async (_: undefined, { input }: createUserArgs) => {
            return account.create(input);
        },
        login: async (_: undefined, { input }: loginArgs) => {
            return account.login(input);
        },
        refreshAccess: async (_: undefined, { refreshToken }: refreshAccessArgs) => {
            return account.refreshAccess(refreshToken);
        }
    }
};
