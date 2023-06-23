import type { User, CourseTutor } from '@prisma/client';

export type GetTutorByEmailFn = (email: string) => Promise<User | null>;
export type GetTutorCoursesFn = (id: number) => Promise<CourseTutor[] | null>;
