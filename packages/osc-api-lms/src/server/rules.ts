import { rule } from 'graphql-shield';
import type { LmsContext } from '~/types/interfaces';

export const isAuthenticated = rule()((_: undefined, __: undefined, { user }: LmsContext) => {
    return user !== null;
});
