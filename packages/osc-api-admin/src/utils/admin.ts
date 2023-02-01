import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const unassignedStudents = async (limit: number) => {
    const students = await prisma.courseStudent.findMany({
        distinct: ['studentId'],
        where: {
            tutorId: null,
        },
        select: {
            studentId: true,
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    studying: {
                        select: {
                            courseId: true,
                            course: {
                                select: {
                                    title: true,
                                },
                            },
                            tutorId: true,
                            tutor: {
                                select: {
                                    profile: {
                                        select: {
                                            firstName: true,
                                            lastName: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        take: limit,
        orderBy: [{ createdAt: 'asc' }],
    });

    return students;
};
