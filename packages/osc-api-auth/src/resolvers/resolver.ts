import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import * as account from '~/utils/account';
import * as password from '~/utils/password';

const prisma = new PrismaClient();

type getUserArgs = {
    id: number;
};
type createUserArgs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
type loginArgs = {
    email: string;
    password: string;
};

export const resolvers = {
    Query: {
        users: async () => {
            return await prisma.user.findMany();
        },
        user: async (_: undefined, args: getUserArgs) => {
            return await prisma.user.findUnique({
                where: {
                    id: args.id
                }
            });
        }
    },

    Mutation: {
        createUser: async (_: undefined, args: createUserArgs) => {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: args.email
                }
            });

            if (existingUser) {
                throw new GraphQLError('An account already exists for the specified email.', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                });
            }

            const hashedPassword = await password.hash(args.password);
            const user = await prisma.user.create({
                data: {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
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
