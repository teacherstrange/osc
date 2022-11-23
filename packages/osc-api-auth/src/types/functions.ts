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
import type { createUserInput, getUsersArgs, loginArgsInput } from './arguments';
import type { PermissionsProps } from './interfaces';

export type CreateUserFn = (input: createUserInput) => Promise<User | Error>;
export type GetUserFn = (userId: number) => Promise<User | null>;
export type GetMultipleUsersFn = (args: getUsersArgs) => Promise<User[]>;

export type LoginFn = (
    input: loginArgsInput
) => Promise<{ accessToken: Promise<string>; refreshToken: Promise<string> } | Error>;

export type RefreshAccessFn = (refreshToken: string) => Promise<{ accessToken: string } | Error>;
export type AccessTokenFn = (userId: number) => Promise<string>;
export type RefreshTokenFn = (userId: number) => Promise<string>;

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
