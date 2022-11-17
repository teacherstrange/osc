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
        users: async (
            _: undefined,
            {
                start = 0,
                limit = 50,
                cursor = null,
                pagination = 'offset',
                orderBy = 'firstName',
                orderDir = 'asc'
            }: getUsersArgs
        ) => {
            return pagination == 'cursor'
                ? await prisma.user.findMany({
                      skip: cursor ? 1 : start,
                      take: limit,
                      cursor: {
                          id: cursor ?? 1
                      },
                      orderBy: {
                          [orderBy]: orderDir
                      }
                  })
                : await prisma.user.findMany({
                      skip: start,
                      take: limit,
                      orderBy: {
                          [orderBy]: orderDir
                      }
                  });
        },
        user: async (_: undefined, args: getUserArgs, context: AuthContext) => {
            return await account.get(args.id ?? context.user!.id);
        }
    },
    User: {
        profile: async (parent: User) => {
            return await account.profile(parent.id);
        }
    },
    Mutation: {
        createUser: async (_: undefined, args: createUserArgs) => {
            const { input } = args;
            return account.create(input);
        },
        login: async (_: undefined, args: loginArgs) => {
            const { input } = args;
            return account.login(input);
        },
        refreshAccess: async (_: undefined, args: refreshAccessArgs) => {
            const { refreshToken } = args;
            return account.refreshAccess(refreshToken);
        }
    }
};
