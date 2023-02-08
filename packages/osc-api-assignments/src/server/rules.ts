import { rule } from 'graphql-shield';
import type { AssignmentsContext } from '~/types/interfaces';

export const isAuthenticated = rule()(
    (_: undefined, __: undefined, { user }: AssignmentsContext) => {
        return user !== null;
    }
);
