import { rule } from 'graphql-shield';
import type { AuthContext } from '~/types/interfaces';
import { userCan } from '~/utils/auth';

export const isAuthenticated = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return user !== null;
});

export const canReadOwnAccount = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'canReadOwnAccount');
});

export const isReadingOwnAccount = rule()((_: undefined, { id }, { user }: AuthContext) => {
    return (id ?? user!.id) === user!.id;
});

export const canListOthers = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'viewAccountsList');
});

export const canViewOther = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'viewOtherAccount');
});

export const canCreateUser = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'createOtherAccount');
});
