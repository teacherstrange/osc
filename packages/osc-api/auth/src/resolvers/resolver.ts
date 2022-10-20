import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type getUserArgs = {
    id: Number;
};

export const resolvers = {
    Query: {
        users: () => {
            return prisma.User.findMany();
        },
        user: (_: undefined, args: getUserArgs) => {
            return prisma.User.findUnique({
                where: {
                    id: args.id
                }
            });
        }
    }
};
