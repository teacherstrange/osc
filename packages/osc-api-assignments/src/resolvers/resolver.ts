import type { getStudentsAssignments } from '~/types/arguments';

export const resolvers = {
    Query: {
        studentsAssignments: async (_: undefined, { id }: getStudentsAssignments) => {
        },
    },
};
