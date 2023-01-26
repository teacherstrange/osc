import { getUserById } from 'osc-api';
import type { getUserCourses } from '~/types/arguments';
import type { LmsContext } from '~/types/interfaces';

export const resolvers = {
    Query: {
        usersCourses: async (_: undefined, args: getUserCourses, { lms }: LmsContext) => {
            const user = await getUserById(args.id);

            if (user) {
                let courses = await lms.get(`/courses/${user.lmsLink[0].externalId}/courses`);
                console.log(courses);
                return courses;
            }
            return null;
        },
    },
    Mutation: {},
};
