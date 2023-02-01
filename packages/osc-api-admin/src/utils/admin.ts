import { PrismaClient } from '@prisma/client';
import type { GetUnassignedStudents } from '~/types/functions';

const prisma = new PrismaClient();

export const unassignedStudents: GetUnassignedStudents = async (limit) => {
    return await prisma.courseStudent.findMany({
        where: {
            tutorId: null,
        },
        include: {
            profile: {
                include: {
                    studying: true,
                },
            },
        },
    });
};
