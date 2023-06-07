import { PrismaClient } from '@prisma/client';

import type { GetOrgByIdFn, GetOrgByNameFn } from './types';
export * from './types';

const prisma = new PrismaClient();

export const getOrgById: GetOrgByIdFn = async (id) => {
    return await prisma.organisation.findUnique({
        where: {
            id,
        },
    });
};

export const getOrgByName: GetOrgByNameFn = async (name) => {
    return await prisma.organisation.findFirst({
        where: {
            name,
        },
    });
};
