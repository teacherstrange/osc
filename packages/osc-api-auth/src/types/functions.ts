import type { User, UserAvatar, UserRole, Permission, CourseTutor, Course } from '@prisma/client';
import type { CrmTokensAPI, LmsTokensAPI, UserRolesAPI } from '.';
import type {
    createUserInput,
    getUsersArgs,
    loginArgsInput,
    createUserSetupInput,
    completeRegistration,
    passwordResetInput,
    getPermissionsArgs,
    createTutorInput,
    completeTutorCreate,
    markAsIVInput,
    createUserSocialInput,
} from './arguments';
import type { PermissionsProps } from './interfaces';

export type CreateUserFn = (input: createUserInput, userId: number) => Promise<User | Error>;
export type GetUserFn = (userId: number) => Promise<User | null>;
export type GetMultipleUsersFn = (args: getUsersArgs) => Promise<User[]>;
export type GetAllPermissionsFn = (args: getPermissionsArgs) => Promise<Permission[] | null>;
export type CreateUserSetupFn = (input: createUserSetupInput) => Promise<User | Error>;
export type assignRoleFn = (userId: number, roleId: number) => Promise<UserRole | Error>;
export type CompleteRegistrationFn = (input: completeRegistration) => Promise<User | Error>;

export type CreateTutorFn = (input: createTutorInput) => Promise<User | Error>;
export type MarkAsIVFn = (input: markAsIVInput) => Promise<UserRole | Error>;
export type CreateTutorCompleteFn = (input: completeTutorCreate) => Promise<User | Error>;
export type ValidateTutorFn = (
    magicKey: string
) => Promise<(CourseTutor & { course: Course })[] | Error>;

export type LoginFn = (
    input: loginArgsInput
) => Promise<{ accessToken: Promise<string>; refreshToken: Promise<string> } | Error>;

export type RefreshAccessFn = (refreshToken: string) => Promise<{ accessToken: string } | Error>;
export type AccessTokenFn = (userId: number) => Promise<string>;
export type RefreshTokenFn = (userId: number) => Promise<string>;
export type MagicKeyTokenFn = (userId: number) => Promise<string>;
export type VerifyFn = (magicKeyToken: string) => Promise<number | false>;
export type VerifyLinkFn = (magicKeyToken: string) => Promise<User | Error | null>;
export type ResetRequestFn = (email: string) => Promise<Boolean | Error>;
export type PasswordResetFn = (input: passwordResetInput) => Promise<User | Error>;

export type UserProfileFn = (userId: number) => Promise<{
    avatar: UserAvatar | null;
    permissions: PermissionsProps;
    roles: UserRolesAPI;
    crmTokens: CrmTokensAPI;
    lmsTokens: LmsTokensAPI;
}>;

export type UserPermissionsFn = (userId: number) => Promise<PermissionsProps>;

export type UserRolesFn = (userId: number) => Promise<UserRolesAPI>;

export type UserAvatarFn = (userId: number) => Promise<UserAvatar | null>;

export type CrmTokensFn = (userId: number) => Promise<CrmTokensAPI>;

export type LmsTokensFn = (userId: number) => Promise<LmsTokensAPI>;

export type CreateUserSocialFn = (input: createUserSocialInput) => Promise<Boolean | Error>;
export type LoginUserSocialFn = (
    ssoId: string
) => Promise<{ accessToken: Promise<string>; refreshToken: Promise<string> } | Error>;
