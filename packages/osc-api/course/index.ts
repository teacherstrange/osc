import { PrismaClient } from '@prisma/client';

import type { GetAllCoursesFn, GetCourseByIdFn } from './types';
export * from './types';

const prisma = new PrismaClient();

// Get all courses
export const getAllCourseData: GetAllCoursesFn = async () => {
    return await prisma.course.findMany({});
};

// Get Course by course ID
export const getCourseById: GetCourseByIdFn = async (id) => {
    return await prisma.course.findUnique({
        where: {
            id,
        },
    });
};
