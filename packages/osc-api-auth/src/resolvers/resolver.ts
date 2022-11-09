import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import type { createUserArgs, getUserArgs, getUsersArgs, loginArgs } from '~/types/arguments';
import type { authContext } from '~/types/interfaces';
import * as account from '~/utils/account';
import * as password from '~/utils/password';

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
        user: async (_: undefined, args: getUserArgs, { user }: authContext) => {
            return await prisma.user.findUnique({
                where: {
                    id: args.id ?? 0
                }
            });
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
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: input.email
                }
            });

            if (existingUser) {
                throw new GraphQLError('An account already exists for the specified email.', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                });
            }

            const hashedPassword = await password.hash(input.password);
            const user = await prisma.user.create({
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    password: hashedPassword
                }
            });

            return user;
        },
        login: async (_: undefined, args: loginArgs) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: args.email
                }
            });

            if (!user) {
                throw new GraphQLError('No matching user found.', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                });
            }

            const passwordMatch = await password.compare(args.password, user.password);
            if (!passwordMatch) {
                throw new GraphQLError('No matching user found.', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                });
            }

            const token = jwt.sign(
                { user: { id: user.id, permissions: await account.permissions(user.id) } },
                process.env.JWT_SECRET!,
                {
                    algorithm: 'HS256',
                    audience: process.env.JWT_AUDIENCE,
                    expiresIn: 86400
                }
            );

            return { token };
        }
    }
};
