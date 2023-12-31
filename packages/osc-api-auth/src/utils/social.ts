import { PrismaClient } from '@prisma/client';
import * as token from '~/utils/token';
import type { CreateUserSocialFn, LoginUserSocialFn } from '~/types/functions';
const prisma = new PrismaClient();

export const createUserSocial: CreateUserSocialFn = async (input, userId) => {
    await prisma.userSocial.create({
        data: {
            userId: userId,
            socialId: input.socialId,
            ssoRef: input.ssoRef,
        },
    });
    return true;
};

export const loginUserSocial: LoginUserSocialFn = async (socialId, ssoRef) => {
    const social = await prisma.social.findFirst({
        where: {
            id: socialId,
        },
    });
    if (!social) {
        return new Error('Unable to log in');
    }
    const userSocial = await prisma.userSocial.findFirst({
        where: {
            ssoRef: ssoRef,
            socialId: socialId,
        },
    });
    if (!userSocial) {
        return new Error('SSO Login failed');
    }
    const accessToken = token.access(userSocial.userId);
    const refreshToken = token.refresh(userSocial.userId);

    return { accessToken, refreshToken };
};
