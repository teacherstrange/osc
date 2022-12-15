import { rule } from 'graphql-shield';
import type { EcommerceContext } from '~/types/interfaces';

export const isAuthenticated = rule()((_: undefined, __: undefined, { user }: EcommerceContext) => {
    return user !== null;
});
