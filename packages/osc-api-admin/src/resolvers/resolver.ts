import type { getUnassignedStudentsArgs } from '~/types/arguments';
import * as admin from '~/utils/admin';

export const resolvers = {
    Query: {
        unassignedStudents: async (_: undefined, args: getUnassignedStudentsArgs) => {
            return await admin.unassignedStudents(args.limit);
        },
    },
    Mutation: {},
};
