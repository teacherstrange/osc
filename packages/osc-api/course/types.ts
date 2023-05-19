import type { Course, CourseStudent, CourseTutor } from '@prisma/client';

export type GetCourseByIdFn = (id: number) => Promise<Course | null>;
export type GetCourseStudentsFn = (id: number) => Promise<CourseStudent | null>;
export type GetCourseTutorsFn = (id: number) => Promise<CourseTutor | null>;
export type GetAllCoursesFn = () => Promise<Course[]>;