import type { getUnassignedStudentsArgs } from '~/types/arguments';
import type { AdminContext } from '~/types/interfaces';
import * as admin from '~/utils/admin';

export const resolvers = {
    Query: {
        unassignedStudents: async (
            _: undefined,
            args: getUnassignedStudentsArgs,
            context: AdminContext
        ) => {
            return await admin.unassignedStudents(args.limit);
        },
    },
    Mutation: {},
};
