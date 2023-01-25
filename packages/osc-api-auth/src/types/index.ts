import type { CrmToken, CrmUserLink, LmsToken, LmsUserLink, Role, UserRole } from '@prisma/client';

export type UserRolesAPI = (UserRole & {
    details: Role;
})[];
export type CrmTokensAPI = (CrmToken & {
    crmUser: CrmUserLink;
})[];

export type LmsTokensAPI = (LmsToken & {
    lmsUser: LmsUserLink;
})[];
