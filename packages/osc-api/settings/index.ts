import { PrismaClient } from '@prisma/client';
import type { GetPreferenceByKeyFn, GetPreferenceFn } from './types';

const prisma = new PrismaClient();

export const getPreference: GetPreferenceFn = async (id) => {
    return await prisma.preference.findFirst({
        where: {
            id,
        },
    });
};

export const getPreferenceByKey: GetPreferenceByKeyFn = async (key) => {
    return await prisma.preference.findFirst({
        where: {
            key,
        },
    });
};
