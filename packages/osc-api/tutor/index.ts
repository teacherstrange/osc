import { PrismaClient } from '@prisma/client';

import type { GetTutorByEmailFn, GetTutorCoursesFn } from './types';
export * from './types';

const prisma = new PrismaClient();

// Get Tutor by User ID
export const getTutorByEmail: GetTutorByEmailFn = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};

// Get all courses linked to a tutor
export const getTutorCourses: GetTutorCoursesFn = async (tutorId) => {
    return await prisma.courseTutor.findMany({
        where: {
            tutorId,
        },
    });
};
