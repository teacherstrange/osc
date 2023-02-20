import { getUserById } from 'osc-api';
import type { getUserCourses } from '~/types/arguments';
import type { LmsContext } from '~/types/interfaces';

export const resolvers = {
    Query: {
        usersCourses: async (_: undefined, args: getUserCourses, { lms }: LmsContext) => {
            const user = await getUserById(args.id);

            if (user) {
                let courses = await lms.get(`/users/${user.lmsLink[0].externalId}/courses`, {
                    params: {
                        source: 'OSC API',
                    },
                });
                return courses.data;
            }
            return null;
        },
    },
    Mutation: {},
};
