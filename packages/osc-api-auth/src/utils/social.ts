import { PrismaClient } from '@prisma/client';
import * as token from '~/utils/token';
import type { CreateUserSocialFn, LoginUserSocialFn } from '~/types/functions';
const prisma = new PrismaClient();

export const createUserSocial: CreateUserSocialFn = async (input) => {
    const social = await prisma.social.create({
        data: {
            name: input.name,
            ssoId: input.ssoId,
        },
    });
    await prisma.userSocial.create({
        data: {
            userId: input.userId,
            socialId: social.id,
        },
    });
    return true;
};

export const loginUserSocial: LoginUserSocialFn = async (ssoId) => {
    const social = await prisma.social.findFirst({
        where: {
            ssoId: ssoId,
        },
    });
    if (!social) {
        return new Error('Unable to log in');
    }
    const userSocial = await prisma.userSocial.findFirst({
        where: {
            socialId: social.id,
        },
    });
    if (!userSocial) {
        return new Error('SSO Login failed');
    }
    const accessToken = token.access(userSocial.userId);
    const refreshToken = token.refresh(userSocial.userId);

    return { accessToken, refreshToken };
};
