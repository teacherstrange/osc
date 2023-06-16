import { PrismaClient } from '@prisma/client';
import type { GetPreferenceByKeyFn } from './types';

const prisma = new PrismaClient();

export const getPreferenceByKey: GetPreferenceByKeyFn = async (key) => {
    return await prisma.preference.findFirst({
        where: {
            key,
        },
    });
};
