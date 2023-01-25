import { rule } from 'graphql-shield';
import type { CrmContext } from '~/types/interfaces';

export const isAuthenticated = rule()((_: undefined, __: undefined, { user }: CrmContext) => {
    return user !== null;
});
