import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type getUserArgs = {
    id: string;
};

export const resolvers = {
    Query: {
        users: () => {
            return prisma.user.findMany();
        },
        user: (_: undefined, args: getUserArgs) => {
            return prisma.user.findUnique({
                where: {
                    id: args.id
                }
            });
        }
    }
};
