import { PrismaClient } from '@prisma/client';
import type { GetUserByEmailFn, GetUserByIdFn } from './types';
export * from './types';

const prisma = new PrismaClient();

export const getUserById: GetUserByIdFn = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
    });
};

export const getUserByEmail: GetUserByEmailFn = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};
