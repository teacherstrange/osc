import { rule } from 'graphql-shield';
import { userCan } from 'osc-api';
import type { AuthContext } from '~/types/interfaces';

export const isAuthenticated = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return user !== null;
});

export const canReadOwnAccount = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'canReadOwnAccount');
});

export const isReadingOwnAccount = rule()((_: undefined, { id }, { user }: AuthContext) => {
    // If ID is supplied in agrs, otherwise resolver defaults to logged in user
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

export const canUploadCourseResource = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'canUploadCourseResource');
});

export const viewAssignedCourses = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'viewAssignedCourses');
});

export const viewAssessmentsToMark = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'viewAssessmentsToMark');
});

export const viewInvoices = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'viewinvoices');
});

export const viewAssignedStudents = rule()((_: undefined, __: undefined, { user }: AuthContext) => {
    return userCan(user!, 'viewAssignedStudents');
})

