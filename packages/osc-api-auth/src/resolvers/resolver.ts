import type { User } from '@prisma/client';
import type {
    createUserArgs,
    getUserArgs,
    getUsersArgs,
    loginArgs,
    refreshAccessArgs,
    createUserSetupArgs,
    magicKeyArgs,
    completeRegistrationArgs,
    ResetRequestArgs,
    completeResetPasswordArgs,
    getPermissionsArgs,
    createTutorArgs,
    completeTutorArgs,
    markUserAsIVArgs,
    socialLoginArgs,
    socialLoginCreateArgs,
} from '~/types/arguments';
import type { AuthContext } from '~/types/interfaces';
import * as account from '~/utils/account';
import * as social from '~/utils/social';

export const resolvers = {
    Query: {
        users: async (_: undefined, args: getUsersArgs) => {
            return await account.getMultiple(args);
        },
        user: async (_: undefined, args: getUserArgs, { user }: AuthContext) => {
            return await account.get(args.id ?? user!.id);
        },
        permissions: async (_: undefined, args: getPermissionsArgs) => {
            return await account.getAllUserPermissions(args);
        },
    },
    User: {
        profile: async ({ id }: User) => {
            return await account.profile(id);
        },
    },
    Mutation: {
        createUser: async (_: undefined, { input }: createUserArgs, { user }: AuthContext) => {
            return account.create(input, user!.id);
        },
        login: async (_: undefined, { input }: loginArgs) => {
            return account.login(input);
        },
        refreshAccess: async (_: undefined, { refreshToken }: refreshAccessArgs) => {
            return account.refreshAccess(refreshToken);
        },
        createUserSetup: async (_: undefined, { input }: createUserSetupArgs) => {
            return account.createSetup(input);
        },
        validateMagicToken: async (_: undefined, { magicKeyToken }: magicKeyArgs) => {
            return account.verifyLink(magicKeyToken);
        },
        completeRegistration: async (_: undefined, { input }: completeRegistrationArgs) => {
            return account.completeRegistration(input);
        },
        requestResetPassword: async (_: undefined, { email }: ResetRequestArgs) => {
            return account.resetRequest(email);
        },
        completeResetPassword: async (_: undefined, { input }: completeResetPasswordArgs) => {
            return account.passwordReset(input);
        },
        createTutor: async (_: undefined, { input }: createTutorArgs, { user }: AuthContext) => {
            return account.createTutor(input, user!.id);
        },
        validateTutor: async (_: undefined, { magicKeyToken }: magicKeyArgs) => {
            return account.validateTutor(magicKeyToken);
        },
        completeTutorCreate: async (_: undefined, { input }: completeTutorArgs) => {
            return account.completeTutorCreate(input);
        },
        markUserAsIV: async (_: undefined, { userId }: markUserAsIVArgs, { user }: AuthContext) => {
            return account.markAsIV(userId, user!.id);
        },
        socialLogin: async (_: undefined, { socialId, ssoRef }: socialLoginArgs) => {
            return social.loginUserSocial(socialId, ssoRef);
        },
        socialLoginCreate: async (
            _: undefined,
            { input }: socialLoginCreateArgs,
            { user }: AuthContext
        ) => {
            return social.createUserSocial(input, user!.id);
        },
        validateFromorder: async (_: undefined, { magicKeyToken }: magicKeyArgs) => {
            return account.validateFromOrder(magicKeyToken);
        },
        updatePasswordFromOrder: async (_: undefined, { input }: completeResetPasswordArgs) => {
            return account.UpdatePasswordFromOrder(input);
        },
    },
};
