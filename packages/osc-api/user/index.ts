import { PrismaClient } from '@prisma/client';

import type {
    GetUserByEmailFn,
    GetUserByIdFn,
    GetRoleByIdFn,
    GetRoleByTitleFn,
    GetAllPermissionsFn,
} from './types';
export * from './types';

const prisma = new PrismaClient();

export const getUserById: GetUserByIdFn = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
        include: userInclude(),
    });
};

export const getRoleById: GetRoleByIdFn = async (id) => {
    return await prisma.role.findUnique({
        where: {
            id,
        },
    });
};

export const getRoleByTitle: GetRoleByTitleFn = async (title) => {
    return await prisma.role.findFirst({
        where: {
            title,
        },
    });
};

export const getUserByEmail: GetUserByEmailFn = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
        include: userInclude(),
    });
};

export const getAllPermissions: GetAllPermissionsFn = async () => {
    return await prisma.permission.findMany({});
};

const userInclude = () => {
    return {
        crmLink: {
            select: {
                externalId: true,
            },
        },
        lmsLink: {
            select: {
                externalId: true,
            },
        },
    };
};
