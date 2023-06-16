import type { CourseStudent, User } from '@prisma/client';

type UnassignedStudentsReturn = (CourseStudent & {
    profile: User & {
        studying: CourseStudent[];
    };
})[];
export type GetUnassignedStudents = (limit: number) => Promise<UnassignedStudentsReturn>;
