import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type {
    createUserArgs,
    getUserArgs,
    getUsersArgs,
    loginArgs,
    refreshAccessArgs
} from '~/types/arguments';
import type { AuthContext } from '~/types/interfaces';
import * as account from '~/utils/account';

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        users: async (_: undefined, args: getUsersArgs) => {
            const {
                start = 0,
                limit = 50,
                cursor = null,
                pagination = 'offset',
                orderBy = 'firstName',
                orderDir = 'asc'
            } = args;

            if (pagination == 'cursor' && cursor) {
                return await prisma.user.findMany({
                    skip: 1,
                    take: limit,
                    cursor: {
                        id: cursor
                    },
                    orderBy: {
                        [orderBy]: orderDir
                    }
                });
            }

            return await prisma.user.findMany({
                skip: start,
                take: limit,
                orderBy: {
                    [orderBy]: orderDir
                }
            });
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
            // const { refreshToken } = args;
            return account.refreshAccess(refreshToken);
        }
    }
};
