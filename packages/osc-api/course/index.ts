import { PrismaClient } from '@prisma/client';

import type { GetAllCoursesFn, GetCourseByIdFn } from './types';
export * from './types';

const prisma = new PrismaClient();

export const getAllCourseData: GetAllCoursesFn = async () => {
    return await prisma.course.findMany({

    })
};

export const getCourseById: GetCourseByIdFn = async (id) => {
    return await prisma.course.findUnique({
        where: {
            id,
        },
    });
};