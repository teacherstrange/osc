import { rule } from 'graphql-shield';
import type { AdminContext } from '~/types/interfaces';

export const isAuthenticated = rule()((_: undefined, __: undefined, { user }: AdminContext) => {
    return user !== null;
});
