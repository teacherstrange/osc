import type {
    Crm,
    CrmToken,
    Lms,
    LmsToken,
    Role,
    User,
    UserAvatar,
    UserRole
} from '@prisma/client';
import type { createUserInput, loginArgsInput } from './arguments';
import type { userJWT } from './general';
import type { PermissionsProps } from './interfaces';

export type CreateUserFn = (input: createUserInput) => Promise<User>;
export type GetUserFn = (userId: number) => Promise<User | null>;
export type RefreshAccessFn = (refreshToken: string) => Promise<{ accessToken: string }>;

export type LoginFn = (input: loginArgsInput) => Promise<{
    accessToken: Promise<string>;
    refreshToken: Promise<string>;
}>;

export type UserProfileFn = (userId: number) => Promise<{
    avatar: UserAvatar | null;
    permissions: PermissionsProps;
    roles: (UserRole & {
        details: Role;
    })[];
    crmTokens: (CrmToken & {
        crm: Crm;
    })[];
    lmsTokens: (LmsToken & {
        lms: Lms;
    })[];
}>;

export type UserPermissionsFn = (userId: number) => Promise<PermissionsProps>;
export type UserRolesFn = (userId: number) => Promise<
    (UserRole & {
        details: Role;
    })[]
>;

export type UserAvatarFn = (userId: number) => Promise<UserAvatar | null>;
export type CrmTokensFn = (userId: number) => Promise<
    (CrmToken & {
        crm: Crm;
    })[]
>;
export type LmsTokensFn = (userId: number) => Promise<
    (LmsToken & {
        lms: Lms;
    })[]
>;

export type UserCanFn = (user: userJWT, desiredPermission: string | string[]) => boolean;
